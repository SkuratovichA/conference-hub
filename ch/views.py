from django.views import generic

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


class SearchConferencesView(generic.TemplateView):
    template_name = 'ch/search_conferences.html'
    pass


class UsersAndOrganizations(generic.TemplateView):
    template_name = 'ch/users_and_organizations.html'
    pass

