from django.utils import timezone
from django.views import generic
from django.shortcuts import redirect
from ch.models import Conference, Event
from ch.forms.conference import CreateConferenceForm, CreateEventForm

class IndexView(generic.TemplateView):
    template_name = 'ch/index.html'


class AboutView(generic.TemplateView):
    template_name = 'ch/index.html'


class PopularConferencesView(generic.TemplateView):
    template_name = 'ch/popular_conferences.html'


class CreateConferenceView(generic.CreateView):
    model = Conference
    form_class = CreateConferenceForm
    template_name = 'ch/create_conference.html'

    def form_valid(self, form):
        conf = form.save()
        return redirect('ch:conf_search')

    def form_invalid(self, form):
        return super().form_invalid(form)


class SearchConferencesView(generic.ListView):
    template_name = 'ch/search_conferences.html'
    context_object_name = 'upcoming_events'

    def get_queryset(self):
        """Return the future events"""
        return Conference.objects.filter(
            date_from__gte=timezone.now()
            ).order_by('date_from')


class ConfInfoView(generic.DetailView):
    model = Conference
    template_name = 'ch/conference_info.html'

class EventInfoView(generic.DetailView):
    model = Event
    template_name = 'ch/event_info.html'


class CreateEventView(generic.CreateView):
    model = Event
    form_class = CreateEventForm #todo
    template_name = 'ch/create_event.html'

    def form_valid(self, form):
        event = form.save()
        return redirect('ch:conf_search')#todo redirect back to conf detail

    def form_invalid(self, form):
        return super().form_invalid(form)



class UsersAndOrganizations(generic.TemplateView):
    template_name = 'ch/users_and_organizations.html'
