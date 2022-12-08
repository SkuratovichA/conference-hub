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

from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated


class ConferenceUserSignupView(TemplateView):
    template_name = 'users/signup.html'
    # form = ConferenceUserSignupForm


class ConferenceUserLogoutView(View, SuccessMessageMixin):
    success_message = MessageMixin.messages.USERS.success.logout

    # TODO 20: add MessagesMixin
    def get(self, request):
        logout(request)


# class ConferenceUserSigninView(views.LoginView, SuccessMessageMixin):
#     success_message = MessageMixin.messages.USERS.success.login
#     template_name = 'users/login.html'
#     form = ConferenceUserSigninForm
    # TODO 20: add MessagesMixin

class ConferenceUserSigninView(APIView):
    authentication_classes = [SessionAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticated   ]

    def post(self, request):
        print(request.data.get('username', None))
        return Response({})


# class ConferenceUserListView(generic.ListView):
#     model = ConferenceUserModel
#     template_name = 'users/users.html'
#

class ConferenceUserListView(viewsets.ModelViewSet):
    serializer_class = sers.ConferenceUserSerializer
    queryset = u_models.ConferenceUserModel.objects.all()
