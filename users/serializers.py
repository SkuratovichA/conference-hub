from rest_framework import serializers
import users.models as u_models
import logging
from django.contrib.auth.password_validation import validate_password

logger = logging.getLogger(__name__)


class ConferenceUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = u_models.ConferenceUserModel
        fields = ['email', 'username', 'name', 'country', 'city']


class CreateUserMixin(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True, validators=[validate_password])

    class Meta(ConferenceUserSerializer.Meta):
        fields = ConferenceUserSerializer.Meta.fields + ['password', 'password2']

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password": "Password fields didn't match"})
        return attrs

    def create(self, validated_data):
        logger.debug(f'validated_data: {validated_data}')
        user = u_models.ConferenceUserModel(
            email=validated_data['email'],
            username=validated_data['username'],
            name=validated_data['name'],
            country=validated_data['country'],
            city=validated_data['city']
        )
        user.set_password(validated_data['password'])
        user.save()
        return user


class RegisterResearcherSerializer(CreateUserMixin, serializers.ModelSerializer):
    last_name = serializers.CharField(source="researcher.last_name")

    class Meta(CreateUserMixin.Meta):
        fields = CreateUserMixin.Meta.fields + ['last_name']

    def create(self, validated_data):
        user = super().create(validated_data)
        # user.set_password(validated_data['password'])
        # user.save()
        researcher = u_models.ResearcherModel(
            user=user,
            last_name=validated_data['researcher']['last_name'],
        )
        researcher.save()
        logger.debug(f"created researcher {researcher}")
        return user


class RegisterOrganizationSerializer(CreateUserMixin, serializers.ModelSerializer):

    class Meta(CreateUserMixin.Meta):
        pass

    def create(self, validated_data):
        user = super().create(validated_data)
        # user.set_password(validated_data['password'])
        # user.save()
        organization = u_models.OrganizationModel(
            user=user,
        )
        organization.save()
        logger.debug(f"created organization {organization}")
        return user
