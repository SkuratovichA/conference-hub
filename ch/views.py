from django.utils import timezone
from django.views import generic
from .models import Conference

# from .models import ClassName1, ClassName2 # to connect frontend with models

class IndexView(generic.TemplateView):
    template_name = 'ch/index.html'
    pass

class AboutView(generic.TemplateView):
    template_name = 'ch/index.html'
    pass


class PopularConferencesView(generic.TemplateView):
    template_name = 'ch/popular_conferences.html'
    pass


class SearchConferencesView(generic.ListView):
    template_name = 'ch/search_conferences.html'
    context_object_name = 'upcoming_events'

    def get_queryset(self):
        """Return the future events"""
        return Conference.objects.filter(
            date_from__gte=timezone.now()
            ).order_by('date_from')
    pass


class ConfInfoView(generic.DetailView):
    model = Conference
    template_name = 'ch/detail.html' 

class UsersAndOrganizations(generic.TemplateView):
    template_name = 'ch/users_and_organizations.html'
    pass

