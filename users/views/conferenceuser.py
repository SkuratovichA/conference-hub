from django.contrib.messages.views import SuccessMessageMixin
from conference_hub.utils.message_wrapper import MessageMixin
from django.views.generic.base import TemplateView
from users.forms import ConferenceUserSigninForm, ConferenceUserSignupForm
from django.contrib.auth import logout, views, get_user_model, authenticate
from users import models as u_models
from django.views import generic
from django.views import View

from rest_framework import viewsets, generics, authentication
from users import serializers as sers
from rest_framework import serializers

from rest_framework import exceptions
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import status

import logging

logger = logging.getLogger(__name__)


class ConferenceUserGetInfo(generics.RetrieveUpdateDestroyAPIView):
    queryset = u_models.ConferenceUserModel.objects.all()
    serializer_class = sers.ResearcherInfoSerializer
    permission_classes = (IsAuthenticated, )

    def get(self, request, *args, **kwargs):
        user = u_models.ConferenceUserModel.objects.get(username=request.user.username)

        content = {}
        if user.is_researcher:
            content["infouser"] = sers.ResearcherInfoSerializer(request.user).data
            content["infouser"]["lastname"] = user.researcher.last_name

        content["profile"] = sers.ProfileUserSerializer(user.profile).data

        return Response(content, status=status.HTTP_200_OK)

    def patch(self, request, *args, **kwargs):
        print("PATH WORKS")



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
    queryset = u_models.ResearcherModel.objects.all()
    serializer_class = sers.RegisterResearcherSerializer


class OrganizationSignupAPIView(viewsets.ViewSetMixin, generics.CreateAPIView):
    queryset = u_models.OrganizationModel.objects.all()
    serializer_class = sers.RegisterOrganizationSerializer


class Auth(authentication.BaseAuthentication):
    def authenticate(self, request):
        # Get the username and password
        username = request.data.get('username', None)
        password = request.data.get('password', None)
        if not username or not password:
            raise exceptions.AuthenticationFailed('No credentials provided.')
        credentials = {
            get_user_model().USERNAME_FIELD: username,
            'password': password
        }
        user = authenticate(**credentials)
        if user is None:
            raise exceptions.AuthenticationFailed('Invalid username/password.')
        if not user.is_active:
            raise exceptions.AuthenticationFailed('User inactive or deleted.')
        return (user, None)  # authentication successful


class ConferenceUserSigninAPIView(APIView):
    authentication_classes = (SessionAuthentication, Auth)
    permission_classes = (IsAuthenticated, )

    def post(self, request, format=None):
        logger.debug(f"user: {sers.ConferenceUserSerializer(request.user).data}")
        content = {
            "user": sers.ConferenceUserSerializer(request.user).data,
        }

        logger.debug(f"username: {request.data.get('username')}")
        logger.debug(f"pwd: {request.data.get('password')}")
        return Response(content, status=status.HTTP_200_OK)
