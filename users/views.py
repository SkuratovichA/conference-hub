from django.contrib.messages.views import SuccessMessageMixin
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.mixins import LoginRequiredMixin
from django.contrib.auth.decorators import login_required
from django.contrib.auth.forms import UserCreationForm
from django.utils.decorators import method_decorator
from django.views.generic import ListView
from django.views.generic.base import ContextMixin, TemplateView
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
from .forms import UserCreationForm, UserUpdateForm, ProfileUpdateForm


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


class ProfileView(ContextMixin, LoginRequiredMixin, View):
    form_class = UserUpdateForm
    # mixin
    login_url = None
    permission_denied_message = MessageWrapper.messages.USERS.login_fail
    redirect_field_name = 'users:login-page'

    def get(self, request):
        context = {
            'u_form': UserUpdateForm(instance=request.user),  # edit forms & add current information
            'p_form': ProfileUpdateForm(instance=request.user.profile)
        }
        return render(request, 'users/profile.html', context)
