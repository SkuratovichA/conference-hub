from django.utils import timezone
from django.views import generic
from ch.models import Conference


class IndexView(generic.TemplateView):
    template_name = 'ch/index.html'


class AboutView(generic.TemplateView):
    template_name = 'ch/index.html'


class PopularConferencesView(generic.TemplateView):
    template_name = 'ch/popular_conferences.html'


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


class UsersAndOrganizations(generic.TemplateView):
    template_name = 'ch/users_and_organizations.html'
