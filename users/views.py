from django.views.generic.base import ContextMixin, TemplateView
from users.forms.forms import UserUpdateForm, ProfileUpdateForm
from conference_hub.utils.message_wrapper import MessageMixin
from django.contrib.messages.views import SuccessMessageMixin
from django.contrib.auth.mixins import LoginRequiredMixin
from users.models.conferenceuser import ConferenceUser
from users.forms.organization import OrganizationForm
from users.forms.researcher import ResearcherForm
from django.views.generic.edit import CreateView
from django.contrib.auth import login, logout
from django.shortcuts import render, redirect
from django.urls import reverse_lazy
from django.contrib import messages
from django.views import View


class SignupView(TemplateView):
    """
    First page where user chooses, which type he is
    """
    template_name = 'users/signup.html'


class ResearcherSignupView(SuccessMessageMixin, CreateView):
    model = ConferenceUser
    form_class = ResearcherForm
    template_name = 'users/signup_form.html'
    success_url = reverse_lazy('users:login-page')
    success_message = MessageMixin.messages.USERS.signup_success

    def get_context_data(self, **kwargs):
        kwargs['user_type'] = 'researcher'
        return super().get_context_data(**kwargs)

    def form_valid(self, form):
        user = form.save()
        login(self.request, user)
        return redirect('users:profile-page')


class OrganizationSignupView(SuccessMessageMixin, CreateView):
    model = ConferenceUser
    form_class = OrganizationForm
    template_name = 'users/signup_form.html'
    success_url = reverse_lazy('users:login-page')
    success_message = MessageMixin.messages.USERS.signup_success

    def get_context_data(self, **kwargs):
        kwargs['user_type'] = 'organization'
        return super().get_context_data(**kwargs)

    def form_valid(self, form):
        user = form.save()
        login(self.request, user)
        return redirect('users:profile-page')


class LogoutView(View):

    def get(self, request):
        logout(request)
        messages.success(request, MessageMixin.messages.USERS.logout)


class ProfileView(ContextMixin, LoginRequiredMixin, View):
    form_class = UserUpdateForm
    # mixin
    login_url = None
    permission_denied_message = MessageMixin.messages.USERS.login_fail
    redirect_field_name = 'users:login-page'

    def get(self, request):
        context = {
            'u_form': UserUpdateForm(instance=request.user),  # edit forms & add current information
            'p_form': ProfileUpdateForm(instance=request.user.profile)
        }
        return render(request, 'users/profile.html', context)


# see more:
# https://simpleisbetterthancomplex.com/tutorial/2018/01/18/how-to-implement-multiple-user-types-with-django.html
# from .decorators import researcher_required, organization_required
# class ProfileView(ContextMixin, View):
#     form_class = UserUpdateForm
#     # mixin
#     login_url = None
#     permission_denied_message = MessageMixin.messages.USERS.login_fail
#     redirect_field_name = 'users:login-page'
#
#     @login_required
#     @researcher_required  # TODO: add this decorator to a function we want to be accessible only for certain types of users
#     def get(self, request):
#         context = {
#             'u_form': UserUpdateForm(instance=request.user),  # edit forms & add current information
#             'p_form': ProfileUpdateForm(instance=request.user.profile)
#         }
#         return render(request, 'users/profile.html', context)
