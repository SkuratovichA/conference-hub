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


# from .models import ClassName1, ClassName2 # to connect frontend with models


class LoginView(SuccessMessageMixin, CreateView, MessageWrapper):
    # template_name = 'users/login.html'  # FIXME: not sure if it necessary here

    def get(self, request):
        form = UserForm()
        if "sign-in" in request.GET:
            email = request.GET.get('email')
            password = request.GET.get('pswd')
            user = authenticate(email=email, password=password)
            redirect_page = 'login-page'
            if user:
                login(request, user)
                messages.info(request, self.messages.USERS.login_success)
                redirect_page = 'home-page'
            else:
                messages.info(request, self.messages.USERS.login_fail)
            redirect(redirect_page)
        return render(request, 'users/login.html', {'form': form})


class SignupView(SuccessMessageMixin, CreateView, MessageWrapper):
    # model = User  # FIXME: not sure if it necessary here
    # form_class = UserCreationForm  # FIXME: not sure if it necessary here
    # success_url = reverse_lazy('login')  # FIXME: not sure if it necessary here
    # template_name = 'users/signup.html'  # FIXME: not sure if it necessary here

    def post(self, request):
        if "sign-up" in request.POST:
            form = UserForm(request.POST)
            redirect_page = 'signup-page'
            if form.is_valid():
                user = form.save()  # TODO: do something with the user. for instance add to online_users... (further)
                messages.success(request, self.messages.USERS.signup_success)
                redirect_page = 'login-page'
            else:
                messages.error(request, self.messages.USERS.signup_fail)
            redirect(redirect_page)
        return render(request, 'users/signup.html')


class LogoutView(View, MessageWrapper):

    def get(self, request):
        logout(request)
        messages.success(request, self.messages.USERS.logout)


@method_decorator(login_required(login_url='login-page/'), name='dispatch')
class HomeView(View):
    # TODO: find out how to deal with different kind of users (i.e. orrganization...)

    def get(self, request):
        return render(request, 'users/home_page.html')
