from rest_framework import serializers
import users.models as u_models
import logging

logger = logging.getLogger(__name__)


class CreateUserMixin:
    def create(self, validated_data):
        logger.debug('create!!')
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


class ConferenceUserSerializer(CreateUserMixin, serializers.ModelSerializer):
    class Meta:
        model = u_models.ConferenceUserModel
        fields = ('email', 'username', 'name', 'country', 'city', 'password')
        extra_kwargs = {'password': {'write_only': True}}


class ResearcherSerializer(CreateUserMixin, serializers.ModelSerializer):
    class Meta:
        model = u_models.ResearcherModel
        fields = ('last_name', 'date_of_birth', 'user_id', *[p for p in dir(model) if p.startswith('prop_')])

    def create(self, validated_data):
        user = super().create(validated_data)
        user.set_password(validated_data['password'])
        user.save()
        researcher = u_models.ResearcherModel(
            last_name=validated_data['last_name'],
            date_of_birth=validated_data['date_of_birth']
        )
        return researcher


class OrganizationSerializer(CreateUserMixin, serializers.ModelSerializer):
    class Meta:
        model = u_models.OrganizationModel
        fields = []

    def create(self, validated_data):
        # create user
        user = super().create(validated_data)
        return user


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = u_models.ProfileModel
        fields = "__all__"
