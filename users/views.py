from django.contrib.messages.views import SuccessMessageMixin
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.contrib.auth.forms import UserCreationForm
from django.utils.decorators import method_decorator
from django.views.generic.edit import CreateView
from django.shortcuts import render, redirect
from django.contrib.auth.models import Group
from django.urls import reverse_lazy
from django.contrib import messages
from django.views import View

from django.views import generic
from .forms import UserForm
from .models import User
from conference_hub.utils.message_wrapper import MessageWrapper


class SignupView(SuccessMessageMixin, CreateView):
    model = User
    form_class = UserForm
    template_name = 'users/signup.html'
    success_url = reverse_lazy('users:login-page')
    success_message = MessageWrapper.messages.USERS.signup_success


class LogoutView(View):

    def get(self, request):
        logout(request)
        messages.success(request, MessageWrapper.messages.USERS.logout)


@method_decorator(login_required(login_url='users/login-page/'), name='dispatch')
class HomeView(View):
    # TODO: find out how to deal with different kind of users (i.e. orrganization...)

    def get(self, request):
        return render(request, 'users/hom-.html')
