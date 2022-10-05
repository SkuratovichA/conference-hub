from django.views import generic
from django.http import HttpResponse, Http404
from django.template import loader
from django.shortcuts import get_object_or_404, render
from django.urls import reverse
from django.utils import timezone


# from .models import ClassName1, ClassName2

class IndexView(generic.TemplateView):
    template_name = 'ch/index.html'
    pass


class AboutView(generic.TemplateView):
    template_name = 'ch/index.html'
    pass


class LoginView(generic.TemplateView):
    template_name = 'ch/index.html'
    pass


class SignupView(generic.TemplateView):
    template_name = 'ch/index.html'
    pass
