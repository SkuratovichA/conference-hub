from django.contrib.messages.views import SuccessMessageMixin
from conference_hub.utils.message_wrapper import MessageMixin
from django.views.generic.base import TemplateView
from users.forms import ConferenceUserSigninForm
from django.contrib.auth import logout, views
from django.views import generic
from django.views import View


class ConferenceUserSignupView(TemplateView):
    template_name = 'users/signup.html'


class ConferenceUserLogoutView(View, SuccessMessageMixin):
    success_message = MessageMixin.messages.USERS.success.logout

    # TODO 20: add MessagesMixin
    def get(self, request):
        logout(request)


class ConferenceUserSigninView(views.LoginView, SuccessMessageMixin):
    success_message = MessageMixin.messages.USERS.success.login
    template_name = 'users/login.html'
    form = ConferenceUserSigninForm
    # TODO 20: add MessagesMixin


class UsersAndOrganizations(generic.TemplateView):
    template_name = 'ch/users_and_organizations.html'
