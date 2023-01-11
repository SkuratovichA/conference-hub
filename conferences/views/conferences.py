# author: Khrystsiuk Dziyana
# author: Shchapaniak Andrei

from django.contrib.auth.decorators import login_required
import datetime
from django.urls import reverse, reverse_lazy
from django.views import generic
from django.utils import timezone
from conferences.models import ConferenceModel
from conferences import forms as conf_forms
from users import models as u_models
from conferences import models as conf_models
from django.shortcuts import redirect, get_object_or_404
from conference_hub.utils.message_wrapper import MessageMixin
from django.contrib.auth.mixins import PermissionRequiredMixin, LoginRequiredMixin
import conferences.serializers as sers
from rest_framework import viewsets, generics
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import FileUploadParser
from rest_framework import status
from datetime import date

import logging

logger = logging.getLogger(__name__)


class ConferenceGetOneAPI(APIView):
    queryset = conf_models.ConferenceModel
    serializer_class = sers.ConferenceSerializerSlug
    lookup_field = 'slug'

    def get(self, request, *args, **kwargs):
        content = {}
        conf = conf_models.ConferenceModel.objects.get(slug=kwargs['slug'])
        content['conf'] = sers.ConferenceSerializer(conf).data

        logger.debug(f'\n\n{content["conf"]}\n\n')

        return Response(content, status=status.HTTP_200_OK)


class ConferenceGetAllAPI(generics.RetrieveAPIView):
    queryset = conf_models.ConferenceModel
    serializer_class = sers.ConferenceSerializer

    def get(self, request, *args, **kwargs):
        confs = conf_models.ConferenceModel.objects.all()
        content = sers.ConferenceSerializer(confs, many=True).data
        return Response(content, status=status.HTTP_200_OK)


class ConferenceCreateEventAPI(APIView):

    def post(self, request, *args, **kwargs):
        data = request.data['data']
        data['duration'] = datetime.timedelta(seconds=int(data['duration']))
        conference = ConferenceModel.objects.get(slug=kwargs['slug'])

        new_event = conf_models.EventModel(
            conference=conference,
            **{k: data[k] for k in [
                "name",
                "date_time",
                "date_time_end",
                "duration",
                "location",
                "description",
                "type",
            ]}
        )
        new_event.save()

        match new_event.type:
            case "lecture":
                nm = conf_models.LectureModel(
                    event=new_event,
                    # menu=data['menu']
                )
                nm.save()
            case "lunch":
                nm = conf_models.LunchModel(
                    event=new_event,
                    price=int(data['price'])
                )
                nm.save()

        return Response(status=status.HTTP_201_CREATED)


class ConferenceUpdateEventAPI(APIView):

    def post(self, request, *args, **kwargs):
        data = request.data['data']
        event_id = data['event_id']
        conference = ConferenceModel.objects.get(slug=kwargs['slug'])

        event = conf_models.EventModel.objects.get(
            conference=conference,
            event_id=event_id
        )
        logger.debug( 'OLD VALUES:' + '\n\t '.join([f'{k}: {v}' for k, v in data.items()]) )

        for k, v in data.items():
            if k in ['name', 'description', 'data_time', 'date_time_end'] and getattr(event, k) != v:
                setattr(event, k, v)
                logger.debug(f'------ updating {k} -> {v}')

        event.save()
        logger.debug( 'NEW VALUES:' + '\n\t '.join([f'{k}: {v}' for k, v in data.items()]) )

        return Response(status=status.HTTP_201_CREATED)


class ConferenceDeleteEventAPI(APIView):

    def post(self, request, *args, **kwargs):
        event_id = request.data['data']['event_id']
        conference = ConferenceModel.objects.get(slug=kwargs['slug'])

        event = conf_models.EventModel.objects.get(
            conference=conference,
            event_id=event_id
        )
        logger.debug('event to delete: ', event)
        event.delete()

        return Response(status=status.HTTP_201_CREATED)


class ConferenceGetEventsAPI(APIView):

    def get(self, request, *args, **kwargs):
        content = {}
        logger.debug(
            list(kwargs.items())
        )
        conf = conf_models.ConferenceModel.objects.get(slug=kwargs['slug'])
        logger.debug(f'conference: {conf}')
        try:
            events = conf_models.EventModel.objects.filter(conference=conf)
        except conf_models.EventModel.DoesNotExist:
            events = [{
            }]

        content['events'] = list(map(lambda x: sers.EventSerializer(x).data, events))

        def improve_event(event):
            dd = {"lunch": conf_models.LunchModel, }
            if event['type'] in dd.keys():
                event['price'] = int(
                    dd[event['type']].objects.get(event__pk=event['event_id'], event__conference=conf).price.amount)
            return event

        content['events'] = list(map(lambda x: improve_event(x), content['events']))

        return Response(content, status=status.HTTP_200_OK)


class ConferenceOrganizationManipulateAPI(APIView):
    queryset = conf_models.ConferenceModel
    serializer_class = sers.ConferenceSerializerSlug
    permission_classes = (IsAuthenticated,)
    lookup_field = 'slug'

    def get(self, request, *args, **kwargs):
        content = {}
        conf = conf_models.ConferenceModel.objects.get(slug=kwargs['slug'])
        content['conf'] = sers.ConferenceSerializer(conf).data

        return Response(content, status=status.HTTP_200_OK)

    def patch(self, request, *args, **kwargs):
        conf = conf_models.ConferenceModel.objects.get(slug=kwargs['slug'])
        conf.name = request.data['data']['name']
        conf.brief = request.data['data']['brief']
        conf.slug = (request.data['data']['name']).replace(" ", "")
        conf.date_from = (request.data['data']['date_from']).split('T', 1)[0]
        conf.date_to = (request.data['data']['date_to']).split('T', 1)[0]
        conf.address = request.data['data']['address']
        conf.price.amount = request.data['data']['price']

        conf.save()
        return Response(status=status.HTTP_200_OK)

    def delete(self, request, *args, **kwargs):
        conf = conf_models.ConferenceModel.objects.get(name=request.data['data']['name'])
        conf.delete()

        return Response(status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        logger.debug(request.data)
        request.data['data']['date_from'] = (request.data['data']['date_from']).split('T', 1)[0]
        request.data['data']['date_to'] = (request.data['data']['date_to']).split('T', 1)[0]

        org = u_models.OrganizationModel.objects.get(
            user__username=request.data['data']['organization']['user']['username'])

        object1 = conf_models.ConferenceModel(
            date_to=date.today(),
            date_from=date.today(),
            organization=org,
            price=request.data['data']['price'], address=request.data['data']['address'],
            name=request.data['data']['name'], slug=request.data['data']['slug'],
            brief=request.data['data']['brief'])

        object1.save()

        return Response(status=status.HTTP_201_CREATED)


class DisplayConferenceView(generic.ListView):
    model = conf_models.ConferenceModel
    template_name = 'conferences/display_conferences.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        conferences = self.conf_list()
        context['upcoming_confs'] = conferences.filter(date_from__gte=timezone.now()).order_by('date_from')
        context['past_confs'] = conferences.filter(date_from__lt=timezone.now()).order_by('-date_from')
        return context

    def conf_list(self):
        user = self.request.user
        if user.is_researcher:
            return ConferenceModel.objects.filter(visitors__username=user.username)
        if user.is_organization:
            return ConferenceModel.objects.filter(organization__user__username=user.username)


class CreateConferenceView(PermissionRequiredMixin, generic.CreateView):
    model = conf_models.ConferenceModel
    form_class = conf_forms.CreateConferenceForm
    template_name = 'conferences/create_conference.html'
    # permission_required = ('users.user.organization',)
    login_url = reverse_lazy('users:login-page')
    permission_denied_message = MessageMixin.messages.CONFERENCES.fail.create

    def has_permission(self):
        return self.request.user.is_organization

    def form_valid(self, form):
        username = self.kwargs.get('username')
        conf = form.save(username)
        return redirect('conferences:conf_display-page', username)

    def form_invalid(self, form):
        return super().form_invalid(form)


class ModifyConferenceMixin:
    def has_permission(self):
        conference_slug = self.request.get_full_path().split('/')[-1]
        conference = ConferenceModel.objects.get(slug=conference_slug)
        assert conference is not None
        logger.debug(f'`{conference}` is not None if user has permissions')
        can_edit = self.request.user.is_organization
        can_edit = can_edit and (conference is not None)
        can_edit = can_edit and self.request.user == conference.organization.user

        return can_edit


class EditConferenceView(ModifyConferenceMixin, PermissionRequiredMixin, LoginRequiredMixin, generic.UpdateView):
    model = conf_models.ConferenceModel
    form_class = conf_forms.EditConferenceForm
    template_name = 'conferences/edit_conference.html'
    # permission_required = ('users.organization', )
    login_url = reverse_lazy('users:login-page')
    permissions_denied_message = MessageMixin.messages.CONFERENCES.fail.change

    def get_object(self, queryset=None):
        conf_slug = self.kwargs.get('slug')
        return get_object_or_404(conf_models.ConferenceModel, slug=conf_slug)

    def form_valid(self, form):
        form.save()
        return redirect('conferences:conf_detail-page', self.kwargs.get('slug'))


# TODO only parent organization can edit/delete its conference
class DeleteConferenceView(ModifyConferenceMixin, PermissionRequiredMixin, LoginRequiredMixin, generic.DeleteView):
    model = conf_models.ConferenceModel
    login_url = reverse_lazy('users:login-page')
    permissions_denied_message = MessageMixin.messages.CONFERENCES.fail.delete

    def get_success_url(self):
        username = self.request.user.username
        return reverse('conferences:conf_display-page', kwargs={'username': username})


class ConferenceInfoView(generic.DetailView):
    model = conf_models.ConferenceModel
    template_name = 'conferences/conference_info.html'

    def get_context_data(self, **kwargs):
        context = super(ConferenceInfoView, self).get_context_data()
        slug = self.kwargs.get('slug')
        conference = get_object_or_404(ConferenceModel, slug=slug)
        user = self.request.user
        for visitor in conference.visitors.all():
            if user == visitor:
                context['user_participate'] = "true"
        return context


class ConferencesListView(generic.ListView):
    template_name = 'conferences/conferences.html'
    model = ConferenceModel
