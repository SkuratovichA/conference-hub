from django.urls import reverse
from django.views import generic
from django.utils import timezone
from conferences import forms as conf_forms
from conferences import models as conf_models
from django.shortcuts import redirect, get_object_or_404


class DisplayConferenceView(generic.ListView):
    model = conf_models.ConferenceModel
    template_name = 'conferences/display_conferences.html'
    context_object_name = 'upcoming_confs'

    def get_queryset(self):
        """Return the future events"""
        return conf_models.ConferenceModel.objects.filter(
            date_from__gte=timezone.now(), organization__user__username=self.kwargs.get('username')
        ).order_by('date_from')


class CreateConferenceView(generic.CreateView):
    model = conf_models.ConferenceModel
    form_class = conf_forms.CreateConferenceForm
    template_name = 'conferences/create_conference.html'

    def form_valid(self, form):
        username = self.kwargs.get('username')
        conf = form.save(username)
        return redirect('conferences:conf_display-page', username)

    def form_invalid(self, form):
        return super().form_invalid(form)


class EditConferenceView(generic.UpdateView):
    model = conf_models.ConferenceModel
    form_class = conf_forms.EditConferenceForm
    template_name = 'conferences/edit_conference.html'

    def get_object(self, queryset=None):
        conf_slug = self.kwargs.get('slug')
        return get_object_or_404(conf_models.ConferenceModel, slug=conf_slug)

    def form_valid(self, form):
        form.save()
        return redirect('conferences:conf_detail-page', self.kwargs.get('slug'))


class ConferenceInfoView(generic.DetailView):
    model = conf_models.ConferenceModel
    template_name = 'conferences/conference_info.html'


class DeleteConferenceView(generic.DeleteView):
    model = conf_models.ConferenceModel
    template_name = 'conferences/delete_conference.html'

    def get_success_url(self):
        username = self.kwargs.get('username')
        return reverse('conferences:conf_display-page', kwargs={'username': username})
