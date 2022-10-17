from users.forms import ConferenceUserUpdateForm, ResearcherUpdateForm, OrganizationUpdateForm
from django.contrib.messages.views import SuccessMessageMixin
from conference_hub.utils.message_wrapper import MessageMixin
from django.contrib.auth.mixins import LoginRequiredMixin
from django.contrib.auth.views import PasswordChangeView
from django.views.generic import TemplateView
from users.forms import ProfileUpdateForm
from django.urls import reverse_lazy
from django.contrib import messages
from django.shortcuts import render
import logging


logger = logging.getLogger(__name__)


class ProfileView(LoginRequiredMixin, TemplateView):
    login_url = '/login'
    template_name = 'users/profile.html'
    redirect_field_name = ''  # TODO 18
    permission_denied_message = MessageMixin.messages.USERS.fail.permissions


class ProfileUpdateView(TemplateView, LoginRequiredMixin):
    template_name = "users/profile_update.html"
    login_url = '/login'
    permission_denied_message = MessageMixin.messages.USERS.fail.permissions
    redirect_field_name = reverse_lazy('users:profile-page')  # return to user profile page

    @staticmethod
    def get_context(request, request_type):
        allowed_types = ['GET', 'POST']
        if request_type not in allowed_types:
            raise ValueError(f'argument `type` must be one of {allowed_types}')

        args = [request.POST] if request_type == 'POST' else []
        profile_args = request.FILES if request_type == 'POST' else []

        context = {
            'u_form': ConferenceUserUpdateForm(instance=request.user, *args),  # edit forms & add current information
            'p_form': ProfileUpdateForm(instance=request.user.profile, *args, *profile_args),
            'ro_form': (
                ResearcherUpdateForm(instance=request.user.researcher, *args)
                if request.user.is_researcher
                else OrganizationUpdateForm(instance=request.user.organization, *args)
            ),
        }
        return context

    def get(self, request, *args, **kwargs):
        context = self.get_context(request, request_type='GET')
        return render(request, 'users/profile_update.html', context)

    def post(self, request, *args, **kwargs):
        context = self.get_context(request, request_type='POST')
        are_valid = [f.is_valid() for f in context.values()]
        logger.debug(list(zip(context.keys(), are_valid)))
        if all(are_valid):
            map(lambda x: x.save(), context.items())
            messages.success(self.request, MessageMixin.messages.USERS.success.update_profile)
        else:
            messages.error(self.request, MessageMixin.messages.USERS.fail.update_profile)

        return super(TemplateView, self).render_to_response(context)


class ProfileChangePasswordView(SuccessMessageMixin, PasswordChangeView):
    template_name = 'users/profile_password_change.html'
    success_message = MessageMixin.messages.USERS.success.change_password
    success_url = reverse_lazy('users:profile-page')

    # TODO 20: add MessagesMixin & remove SuccessMessageMixin
