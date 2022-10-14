from users.decorators import researcher_required, organization_required
from conference_hub.utils.message_wrapper import MessageMixin
from django.utils.decorators import method_decorator
from django.views.generic.base import ContextMixin
from users.forms import ConferenceUserSigninForm, EditUserProfileForm
from django.contrib.auth import logout, views
from django.contrib import messages
from django.shortcuts import render
from django.views import View, generic
from django.urls import reverse_lazy
from django.contrib.auth.views import PasswordChangeView
from django.contrib.messages.views import SuccessMessageMixin


class LogoutView(View):
    def get(self, request):
        logout(request)
        messages.success(request, MessageMixin.messages.USERS.logout)


@method_decorator(researcher_required(login_url='/login', redirect_field_name=''), name='get')
class ProfileView(ContextMixin, View):
    permission_denied_message = MessageMixin.messages.USERS.login_fail
    redirect_field_name = 'users:login-page'

    def get(self, request):
        return render(request, 'users/profile.html')


class LoginView(views.LoginView):
    template_name = 'users/login.html'
    form = ConferenceUserSigninForm


class ChangePasswordView(SuccessMessageMixin, PasswordChangeView):
    template_name = 'users/change_password.html'
    success_message = "Successfully Changed Your Password"
    success_url = reverse_lazy('users:profile-page')


@method_decorator(researcher_required(login_url='/login', redirect_field_name=''), name='get')
class UpdateUserView(generic.UpdateView):
    form_class = EditUserProfileForm
    template_name = "users/edit_profile.html"
    success_url = reverse_lazy('users:profile-page')

    def get_object(self):
        return self.request.user
