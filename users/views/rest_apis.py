from rest_framework import exceptions, authentication, viewsets, generics
from django.contrib.auth import get_user_model, authenticate
from users import serializers as sers
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.authentication import SessionAuthentication
from rest_framework.permissions import IsAuthenticated, AllowAny
from users import models as u_models

import logging

logger = logging.getLogger(__name__)


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
            "user": request.user,
            "auth": request.auth,
        }
        return Response(content)
