from django.urls import reverse
from django.views import generic
from conferences import forms as conf_forms
from conferences import models as conf_models
from django.shortcuts import redirect, get_object_or_404


class EventInfoView(generic.DetailView):
    model = conf_models.EventModel
    template_name = 'conferences/event_info.html'


class CreateEventView(generic.CreateView):
    model = conf_models.EventModel
    form_class = conf_forms.CreateEventForm
    template_name = 'conferences/create_event.html'

    def form_valid(self, form):
        conf_slug = self.kwargs.get('slug')
        form.save(conf_slug)
        return redirect('conferences:conf_detail-page', conf_slug)

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
        form.save(self.kwargs.get('slug'))
        return redirect('conferences:event_detail-page', self.kwargs.get('slug'), self.kwargs.get('pk'))


class DeleteEventView(generic.DeleteView):
    model = conf_models.EventModel
    pk_url_kwarg = 'pk'
    template_name = 'conferences/delete_event.html'

    def get_success_url(self):
        return reverse('conferences:conf_detail-page', kwargs={'slug': self.kwargs.get('slug')})
