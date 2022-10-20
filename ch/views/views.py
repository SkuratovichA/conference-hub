from django.views import generic


class IndexView(generic.TemplateView):
    template_name = 'ch/index.html'


class AboutView(generic.TemplateView):
    template_name = 'ch/index.html'
