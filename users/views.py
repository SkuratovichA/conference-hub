from django.contrib.messages.views import SuccessMessageMixin
from django.contrib.auth.forms import UserCreationForm
from django.views.generic.edit import CreateView
from django.urls import reverse_lazy
from django.views import generic

# from .models import ClassName1, ClassName2 # to connect frontend with models


class LoginView(SuccessMessageMixin, CreateView):
    template_name = 'users/login.html'
    pass


class SignupView(SuccessMessageMixin, CreateView):
    form_class = UserCreationForm
    success_url = reverse_lazy('login')
    template_name = 'users/signup.html'
    pass
