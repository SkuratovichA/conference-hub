from django.contrib.messages.views import SuccessMessageMixin
from conference_hub.utils.message_wrapper import MessageMixin
from django.views.generic.base import TemplateView
from users.forms import ConferenceUserSigninForm, ConferenceUserSignupForm
from django.contrib.auth import logout, views
from users import models as u_models
from django.views import generic
from django.views import View

from rest_framework import viewsets, generics
from users import serializers as sers


class ConferenceUserSignupView(TemplateView):
    template_name = 'users/signup.html'
    # form = ConferenceUserSignupForm


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


# class ConferenceUserListView(generic.ListView):
#     model = ConferenceUserModel
#     template_name = 'users/users.html'
#

class ConferenceUserListView(viewsets.ModelViewSet):
    serializer_class = sers.ConferenceUserSerializer
    queryset = u_models.ConferenceUserModel.objects.all()
