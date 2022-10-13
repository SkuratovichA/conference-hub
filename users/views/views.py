from users.decorators import researcher_required, organization_required
from conference_hub.utils.message_wrapper import MessageMixin
from users.forms import UserUpdateForm, ProfileUpdateForm
from django.views.generic.base import ContextMixin
from django.contrib.auth import logout
from django.contrib import messages
from django.contrib.auth.decorators import login_required
from django.shortcuts import render
from django.views import View


class LogoutView(View):

    def get(self, request):
        logout(request)
        messages.success(request, MessageMixin.messages.USERS.logout)


# TODO 10: TODO 5: add decorators for functions to make them accessible only for certain types of users. OR USE MIXINS INSTEAD
# see more:
# https://simpleisbetterthancomplex.com/tutorial/2018/01/18/how-to-implement-multiple-user-types-with-django.html
class ProfileView(ContextMixin, View):
    form_class = UserUpdateForm
    # mixin
    login_url = None
    permission_denied_message = MessageMixin.messages.USERS.login_fail
    redirect_field_name = 'users:login-page'

    @login_required
    @researcher_required
    def get(self, request):
        context = {
            'u_form': UserUpdateForm(instance=request.user),  # edit forms & add current information
            'p_form': ProfileUpdateForm(instance=request.user.profilemodel)
        }
        return render(request, 'users/profile.html', context)
