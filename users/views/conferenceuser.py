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
from rest_framework.permissions import IsAuthenticated, AllowAny

import logging

logger = logging.getLogger(__name__)


class ConferenceUserSignupView(TemplateView):
    template_name = 'users/signup.html'

class ConferenceUserLogoutView(View, SuccessMessageMixin):
    success_message = MessageMixin.messages.USERS.success.logout

    def get(self, request):
        logout(request)


class ConferenceUserSigninView(views.LoginView, SuccessMessageMixin):
    success_message = MessageMixin.messages.USERS.success.login
    template_name = 'users/login.html'
    form = ConferenceUserSigninForm


class ConferenceUserSigninView(APIView):
    authentication_classes = [SessionAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticated   ]

    def post(self, request):
        print(request.data.get('username', None))
        return Response({})


class ConferenceUserListView(generic.ListView):
    model = u_models.ConferenceUserModel
    template_name = 'users/users.html'


class ConferenceUserListAPIView(viewsets.ReadOnlyModelViewSet):
    serializer_class = sers.ConferenceUserSerializer
    queryset = u_models.ConferenceUserModel.objects.all()


class SignupAPIViewMixin(viewsets.ViewSetMixin, generics.CreateAPIView):
    permission_classes = (AllowAny, )
    serializer_class = None

    def post(self, request, *args, **kwargs):
        logger.debug('request %s ' % request)
        return super().post(request, *args, **kwargs)


class ResearcherSignupAPIView(SignupAPIViewMixin):
    serializer_class = sers.RegisterResearcherSerializer


class OrganizationSignupAPIView(viewsets.ViewSetMixin, generics.CreateAPIView):
    serializer_class = sers.RegisterOrganizationSerializer
