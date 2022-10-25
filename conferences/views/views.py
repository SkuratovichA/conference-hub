from conferences import forms as conf_forms
from conferences import models as conf_models
from django.shortcuts import redirect, get_object_or_404
from django.urls import reverse
from django.utils import timezone
from django.views import generic


class DisplayConferenceView(generic.ListView):
    model = conf_models.ConferenceModel
    template_name = 'conferences/display_conferences.html'
    context_object_name = 'upcoming_confs'

    def get_queryset(self):
        """Return the future events"""
        return conf_models.ConferenceModel.objects.filter(
            date_from__gte=timezone.now(), organization__user__username=self.kwargs.get('slug')
        ).order_by('date_from')


class CreateConferenceView(generic.CreateView):
    model = conf_models.ConferenceModel
    form_class = conf_forms.CreateConferenceForm
    template_name = 'conferences/create_conference.html'

    def form_valid(self, form):
        slug = self.kwargs.get('slug')
        conf = form.save(slug)
        return redirect('conferences:conf_display-page', slug)

    def form_invalid(self, form):
        return super().form_invalid(form)


class EditConferenceView(generic.UpdateView):
    model = conf_models.ConferenceModel
    form_class = conf_forms.EditConferenceForm
    template_name = 'conferences/edit_conference.html'

    def get_object(self, queryset=None):
        conf_id = self.kwargs.get('pk')
        return get_object_or_404(conf_models.ConferenceModel, conf_id=conf_id)

    def form_valid(self, form):
        form.save()
        return redirect('conferences:conf_detail-page', self.kwargs.get('pk'))


class ConfInfoView(generic.DetailView):
    model = conf_models.ConferenceModel
    template_name = 'conferences/conference_info.html'


class DeleteConferenceView(generic.DeleteView):
    model = conf_models.ConferenceModel
    pk_url_kwarg = 'pk'
    template_name = 'conferences/delete_conference.html'

    def get_success_url(self):
        slug = self.kwargs.get('slug')
        return reverse('conferences:conf_display-page', kwargs={'slug':slug})


class EventInfoView(generic.DetailView):
    model = conf_models.EventModel
    template_name = 'conferences/event_info.html'


class CreateEventView(generic.CreateView):
    model = conf_models.EventModel
    form_class = conf_forms.CreateEventForm
    template_name = 'conferences/create_event.html'

    def form_valid(self, form):
        conf_id = self.kwargs.get('pk')
        event = form.save(conf_id)
        return redirect('conferences:conf_detail-page', conf_id)

    def form_invalid(self, form):
        return super().form_invalid(form)

class EditEventView(generic.UpdateView):
    model = conf_models.EventModel
    form_class = conf_forms.CreateEventForm
    template_name = 'conferences/edit_event.html'

    def get_object(self, queryset=None):
        event_id = self.kwargs.get('pk')
        return get_object_or_404(conf_models.EventModel, event_id=event_id)

    def form_valid(self, form):
        form.save(self.kwargs.get('fk'))
        return redirect('conferences:event_detail-page', self.kwargs.get('fk'), self.kwargs.get('pk'))


class DeleteEventView(generic.DeleteView):
    model = conf_models.EventModel
    pk_url_kwarg = 'pk'
    template_name = 'conferences/delete_event.html'

    def get_success_url(self):
        keys = {'fk': self.kwargs.get('pk'), 'pk': self.kwargs.get('pk')}
        return reverse('conferences:event_detail-page', kwargs=keys)
