from django.contrib.messages.views import SuccessMessageMixin
from conference_hub.utils.message_wrapper import MessageMixin
from django.contrib.auth.mixins import LoginRequiredMixin
from django.contrib.auth.views import PasswordChangeView
from django.views.generic import TemplateView, DetailView
from django.shortcuts import get_object_or_404
from users.forms import ProfileUpdateForm
from users.models import ProfileModel, ConferenceUserModel
from django.urls import reverse_lazy
from django.contrib import messages
from django.shortcuts import render
from users.forms import (
    ConferenceUserUpdateForm,
    ResearcherUpdateForm,
    OrganizationUpdateForm,
)
import logging

logger = logging.getLogger(__name__)


class ProfileView(DetailView):
    template_name = 'users/profile.html'
    model = ConferenceUserModel
    slug_field = 'slug'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['user'] = self.request.user
        context['object'] = get_object_or_404(ConferenceUserModel, username=self.kwargs.get(self.slug_field))
        logger.debug(f'context: {context}')
        return context

    def get_object(self, queryset=None):
        logger.debug(f'kwargs: {self.kwargs}')
        return self.request.user


class ProfileUpdateView(TemplateView, LoginRequiredMixin):
    template_name = "users/profile_update.html"
    login_url = '/login'
    permission_denied_message = MessageMixin.messages.USERS.fail.permissions

    def get_redirect_field_name(self):
        return reverse_lazy('users:profile-page', args=[self.kwargs['slug']])

    @staticmethod
    def get_context(request, request_type):
        allowed_types = ['GET', 'POST']
        if request_type not in allowed_types:
            raise ValueError(f'argument `type` must be one of {allowed_types}')

        args = [request.POST] if request_type == 'POST' else []
        profile_args = [request.FILES] if request_type == 'POST' else []

        context = {
            'u_form': ConferenceUserUpdateForm(instance=request.user, *args),
            'p_form': ProfileUpdateForm(instance=request.user.profile, *args, *profile_args),
            'ro_form': (
                ResearcherUpdateForm(instance=request.user.researcher, *args)
                if request.user.is_researcher else
                OrganizationUpdateForm(instance=request.user.organization, *args)
            )
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
            for i, f in context.items():
                f.save()
                logger.debug(f'{i} saved')
            messages.success(self.request, MessageMixin.messages.USERS.success.update_profile)
        else:
            messages.error(self.request, MessageMixin.messages.USERS.fail.update_profile)

        return super().render_to_response(context)


class ProfileChangePasswordView(SuccessMessageMixin, PasswordChangeView):
    template_name = 'users/profile_password_change.html'
    success_message = MessageMixin.messages.USERS.success.change_password

    # TODO 20: add MessagesMixin & remove SuccessMessageMixin
    def get_success_url(self, *args, **kwargs):
        return reverse_lazy('users:profile-page', args=[self.kwargs['slug']])
