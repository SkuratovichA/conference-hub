from django.urls import reverse, reverse_lazy
from django.views import generic
from django.utils import timezone
from conferences.models import ConferenceModel
from conferences import forms as conf_forms
from conferences import models as conf_models
from django.shortcuts import redirect, get_object_or_404
from conference_hub.utils.message_wrapper import MessageMixin
from django.contrib.auth.mixins import PermissionRequiredMixin, LoginRequiredMixin
import logging

logger = logging.getLogger(__name__)


class DisplayConferenceView(generic.ListView):
    model = conf_models.ConferenceModel
    template_name = 'conferences/display_conferences.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['upcoming_confs'] = conf_models.ConferenceModel.objects.filter(
            date_from__gte=timezone.now(),
            organization__user__username=self.kwargs.get('username')
        ).order_by('date_from')
        context['past_confs'] = conf_models.ConferenceModel.objects.filter(
            date_from__lt=timezone.now(),
            organization__user__username=self.kwargs.get('username')
        ).order_by('-date_from')
        return context

    def get_queryset(self):
        """Return the future events"""
        return conf_models.ConferenceModel.objects.filter(
            date_from__gte=timezone.now(), organization__user__username=self.kwargs.get('username')
        ).order_by('date_from')


class CreateConferenceView(PermissionRequiredMixin, generic.CreateView):
    model = conf_models.ConferenceModel
    form_class = conf_forms.CreateConferenceForm
    template_name = 'conferences/create_conference.html'
    # permission_required = ('users.user.organization',)
    login_url = reverse_lazy('ch:login-page')
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
        conference_pk = self.request.get_full_path().split('/')[-1]
        conference = ConferenceModel.objects.get(pk=conference_pk) is not None
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
    login_url = reverse_lazy('ch:login-page')
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
    login_url = reverse_lazy('ch:login-page')
    permissions_denied_message = MessageMixin.messages.CONFERENCES.fail.delete

    def get_success_url(self):
        username = self.kwargs.get('username')
        return reverse('conferences:conf_display-page', kwargs={'username': username})


class ConferenceInfoView(generic.DetailView):
    model = conf_models.ConferenceModel
    template_name = 'conferences/conference_info.html'
