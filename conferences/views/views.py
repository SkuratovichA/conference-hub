from conferences.forms.conference import CreateConferenceForm, CreateEventForm
from conferences.models.models import ConferenceModel, EventModel
from django.shortcuts import redirect
from django.utils import timezone
from django.views import generic


class CreateConferenceView(generic.CreateView):
    model = ConferenceModel
    form_class = CreateConferenceForm
    template_name = 'conferences/create_conference.html'

    def form_valid(self, form):
        conf = form.save()
        return redirect('conferences:conf_search')

    def form_invalid(self, form):
        return super().form_invalid(form)


class ConfInfoView(generic.DetailView):
    model = ConferenceModel
    template_name = 'conferences/conference_info.html'


class EventInfoView(generic.DetailView):
    model = EventModel
    template_name = 'conferences/event_info.html'


class CreateEventView(generic.CreateView):
    model = EventModel
    form_class = CreateEventForm  # todo
    template_name = 'conferences/create_event.html'

    def form_valid(self, form):
        event = form.save()
        return redirect('conferences:conf_search')  # todo redirect back to conf detail

    def form_invalid(self, form):
        return super().form_invalid(form)
