from conferences.forms.conference import CreateConferenceForm, CreateEventForm
from conferences.models.models import Conference, Event
from django.shortcuts import redirect
from django.utils import timezone
from django.views import generic


class CreateConferenceView(generic.CreateView):
    model = Conference
    form_class = CreateConferenceForm
    template_name = 'conferences/create_conference.html'

    def form_valid(self, form):
        conf = form.save()
        return redirect('conferences:conf_search')

    def form_invalid(self, form):
        return super().form_invalid(form)


class SearchConferencesView(generic.ListView):
    template_name = 'conferences/search_conferences.html'
    context_object_name = 'upcoming_events'

    def get_queryset(self):
        """Return the future events"""
        return Conference.objects.filter(
            date_from__gte=timezone.now()
        ).order_by('date_from')


class ConfInfoView(generic.DetailView):
    model = Conference
    template_name = 'conferences/conference_info.html'


class EventInfoView(generic.DetailView):
    model = Event
    template_name = 'conferences/event_info.html'


class CreateEventView(generic.CreateView):
    model = Event
    form_class = CreateEventForm  # todo
    template_name = 'conferences/create_event.html'

    def form_valid(self, form):
        event = form.save()
        return redirect('conferences:conf_search')  # todo redirect back to conf detail

    def form_invalid(self, form):
        return super().form_invalid(form)
