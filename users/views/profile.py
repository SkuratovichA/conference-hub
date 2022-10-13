from conference_hub.utils.message_wrapper import MessageMixin
from users.forms import UserUpdateForm, ProfileUpdateForm
from django.contrib.auth.mixins import LoginRequiredMixin
from django.views.generic.base import ContextMixin
from django.shortcuts import render
from django.views import View


class ProfileView(ContextMixin, LoginRequiredMixin, View):
    form_class = UserUpdateForm
    # mixin
    login_url = None
    permission_denied_message = MessageMixin.messages.USERS.login_fail
    redirect_field_name = 'users:login-page'

    def get(self, request):
        context = {
            'u_form': UserUpdateForm(instance=request.user),  # edit forms & add current information
            'p_form': ProfileUpdateForm(instance=request.user.profilemodel)
        }
        return render(request, 'users/profile.html', context)
