# author: Skuratovich Aliaksandr
# author: Shchapaniak Andrei

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


class ConferenceUserGetUsers(APIView):
    queryset = u_models.ConferenceUserModel
    serializer_class = sers.ConferenceUserSerializer

    def get(self, request, *args, **kwargs):
        users = u_models.ConferenceUserModel.objects.all()

        content = {}
        res = []
        for user in users:
            if user.is_researcher:
                res.append(sers.ResearcherInfoSerializer(user.researcher).data)
            elif user.is_organization:
                res.append(sers.OrganizationInfoSerializer(user.organization).data)

        content["users"] = res

        return Response(content, status=status.HTTP_200_OK)

class ConferenceUserGetResearchers(APIView):
    queryset = u_models.ResearcherModel
    serializer_class = sers.ResearcherInfoSerializer

    def get(self, request, *args, **kwargs):
        users = u_models.ConferenceUserModel.objects.all()

        content = {}
        arr_res = []
        for user in users:
            if user.is_researcher:
                arr_res.append(sers.ResearcherInfoSerializer(user.researcher).data)

        content["users"] = arr_res
        return Response(content, status=status.HTTP_200_OK)

class ConferenceUserGetOrganizations(APIView):
    queryset = u_models.OrganizationModel
    serializer_class = sers.OrganizationInfoSerializer

    def get(self, request, *args, **kwargs):
        users = u_models.ConferenceUserModel.objects.all()

        content = {}
        arr_org = []
        for user in users:
            if user.is_researcher:
                arr_org.append(sers.ResearcherInfoSerializer(user.researcher).data)

        content["users"] = arr_org
        return Response(content, status=status.HTTP_200_OK)


class ConferenceUserGetInfo(generics.RetrieveUpdateDestroyAPIView):
    queryset = u_models.ConferenceUserModel.objects.all()
    serializer_class = sers.ResearcherInfoSerializer
    permission_classes = (IsAuthenticated, )

    def get(self, request, *args, **kwargs):
        user = u_models.ConferenceUserModel.objects.get(username=request.user.username)

        content = {}
        if user.is_researcher:
            content["infouser"] = sers.ResearcherInfoSerializer(user.researcher).data
        elif user.is_organization:
            content["infouser"] = sers.OrganizationInfoSerializer(user.organization).data

        return Response(content, status=status.HTTP_200_OK)

    def patch(self, request, *args, **kwargs):
        user = u_models.ConferenceUserModel.objects.get(username=request.user.username)

        user.name = request.data['data']['user']['name']
        user.email = request.data['data']['user']['email']
        user.username = request.data['data']['user']['username']
        user.city = request.data['data']['user']['city']
        user.country = request.data['data']['user']['country']

        if user.is_researcher:
            user.researcher.last_name = request.data['data']['last_name']
            user.researcher.save()

        user.save()

        return Response(status=status.HTTP_200_OK)



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
        content = {
            "user": sers.ConferenceUserSerializer(request.user).data,
        }

        return Response(content, status=status.HTTP_200_OK)
