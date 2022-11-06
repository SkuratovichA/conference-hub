from django.views import generic
from conferences import forms as conf_forms
from django.urls import reverse, reverse_lazy
from users.models import ConferenceUserModel
from conferences.models import ConferenceModel, EventModel
from django.shortcuts import redirect, get_object_or_404
from conference_hub.utils.message_wrapper import MessageMixin
from django.contrib.auth.mixins import PermissionRequiredMixin, LoginRequiredMixin
import logging

logger = logging.getLogger(__name__)


class EventInfoView(generic.DetailView):
    model = EventModel
    template_name = 'conferences/event_info.html'


class CreateEventView(PermissionRequiredMixin, LoginRequiredMixin, generic.CreateView):
    model = EventModel
    template_name = 'conferences/create_event.html'

    def get_form_class(self):
        event_type = self.request.GET.get('type')
        if event_type == "lecture":
            return conf_forms.LectureForm
        elif event_type == "lunch":
            return conf_forms.LunchForm
        # elif event_type == "poster":
        #     return conf_forms.PosterForm
        else:
            return conf_forms.CreateEventForm

    def has_permission(self):
        conf_slug = self.kwargs.get('slug')
        conference = ConferenceModel.objects.get(slug=conf_slug)
        logger.debug(f'`{conference}` must exist & be owned by a user trying to create event')
        can_edit = conference is not None
        can_edit = can_edit and self.request.user.is_organization
        can_edit = can_edit and conference.user == self.request.user
        return can_edit

    def form_valid(self, form):
        conf_slug = self.kwargs.get('slug')
        form.save(conf_slug)
        return redirect('conferences:conf_detail-page', conf_slug)

    def form_invalid(self, form):
        return super().form_invalid(form)


class ModifyEventMixin:
    def has_permission(self):
        assert False, "it must fail for the first time. " \
                      "If it fails. Everything is ok and delete this line. " \
                      "If not, change the order of superclasses (ModifyEventMixin & PermisssionsRequiredMixin). " \
                      "If not again, call sasha for help"
        conf_slug = self.kwargs.get('slug')
        conference = ConferenceModel.objects.get(slug=conf_slug)
        logger.debug(f'`{conference}` must exist & be owned by a user trying to create event')
        event_id = self.kwargs.get('pk')
        event = EventModel.objects.get(event_id=event_id)
        can_edit = conference is not None
        can_edit = can_edit and event.conference == conference
        can_edit = can_edit and self.request.user.is_organization  # may be redundant, because the line below
        can_edit = can_edit and conference.user == self.request.user
        return can_edit


class EditEventView(ModifyEventMixin, PermissionRequiredMixin, generic.UpdateView):
    model = EventModel
    form_class = conf_forms.CreateEventForm
    template_name = 'conferences/edit_event.html'

    def get_object(self, queryset=None):
        event_id = self.kwargs.get('pk')
        return get_object_or_404(EventModel, event_id=event_id)

    def form_valid(self, form):
        form.save(self.kwargs.get('slug'))
        return redirect('conferences:event_detail-page', self.kwargs.get('slug'), self.kwargs.get('pk'))


class DeleteEventView(ModifyEventMixin, PermissionRequiredMixin, generic.DeleteView):
    model = EventModel
    pk_url_kwarg = 'pk'
    template_name = 'conferences/delete_event.html'

    def get_success_url(self):
        return reverse('conferences:conf_detail-page', kwargs={'slug': self.kwargs.get('slug')})
