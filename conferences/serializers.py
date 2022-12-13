from rest_framework import serializers
from users.serializers import ResearcherInfoSerializer, ConferenceUserSerializer, OrganizationInfoSerializer
import conferences.models as conf_models
import logging
from django.contrib.auth.password_validation import validate_password

logger = logging.getLogger(__name__)


class Base64ImageField(serializers.ImageField):
    """
    A Django REST framework field for handling image-uploads through raw post data.
    It uses base64 for encoding and decoding the contents of the file.

    Heavily based on
    https://github.com/tomchristie/django-rest-framework/pull/1268

    Updated for Django REST framework 3.
    """

    def to_internal_value(self, data):
        from django.core.files.base import ContentFile
        import base64
        import six
        import uuid

        # Check if this is a base64 string
        if isinstance(data, six.string_types):
            # Check if the base64 string is in the "data:" format
            if 'data:' in data and ';base64,' in data:
                # Break out the header from the base64 content
                header, data = data.split(';base64,')

            # Try to decode the file. Return validation error if it fails.
            try:
                decoded_file = base64.b64decode(data)
            except TypeError:
                self.fail('invalid_image')

            # Generate file name:
            file_name = str(uuid.uuid4())[:12] # 12 characters are more than enough.
            # Get the file name extension:
            file_extension = self.get_file_extension(file_name, decoded_file)

            complete_file_name = "%s.%s" % (file_name, file_extension, )

            data = ContentFile(decoded_file, name=complete_file_name)

        return super(Base64ImageField, self).to_internal_value(data)

    def get_file_extension(self, file_name, decoded_file):
        import imghdr

        extension = imghdr.what(file_name, decoded_file)
        extension = "jpg" if extension == "jpeg" else extension

        return extension

class ConferenceSerializer(serializers.ModelSerializer):
    visitors = ResearcherInfoSerializer(many=True)
    organization = OrganizationInfoSerializer(many=False)

    class Meta:
        model = conf_models.ConferenceModel
        fields = ['name', 'brief', 'slug', 'date_from', 'date_to', 'address', 'price', 'image',
                  'visitors', 'organization']
        extra_kwargs = {
            'image': {
                'validators': []
            }
        }

class ConferenceSerializerSlug(serializers.HyperlinkedModelSerializer):
    visitors = ResearcherInfoSerializer(many=True)
    organization = OrganizationInfoSerializer(many=False)

    class Meta:
        model = conf_models.ConferenceModel
        fields = ['name', 'brief', 'slug', 'date_from', 'date_to', 'address', 'price', 'image',
                  'visitors', 'organization']
        extra_field_kwargs = {'url': {'lookup_field': 'slug'}}
        extra_kwargs = {
            'image': {
                'validators': []
            }
        }


# class ConferenceUserSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = u_models.ConferenceUserModel
#         fields = ['email', 'username', 'name', 'country', 'city']
#
#
# class ResearcherInfoSerializer(serializers.ModelSerializer):
#     class Meta(ConferenceUserSerializer.Meta):
#         fields = ConferenceUserSerializer.Meta.fields + ['is_researcher', 'is_organization', 'balance']
#
# class CreateUserMixin(serializers.ModelSerializer):
#     password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
#     password2 = serializers.CharField(write_only=True, required=True, validators=[validate_password])
#
#     class Meta(ConferenceUserSerializer.Meta):
#         fields = ConferenceUserSerializer.Meta.fields + ['password', 'password2']
#
#     def validate(self, attrs):
#         if attrs['password'] != attrs['password2']:
#             raise serializers.ValidationError({"password": "Password fields didn't match"})
#         return attrs
#
#     def create(self, validated_data):
#         logger.debug(f'validated_data: {validated_data}')
#         user = u_models.ConferenceUserModel(
#             email=validated_data['email'],
#             username=validated_data['username'],
#             name=validated_data['name'],
#             country=validated_data['country'],
#             city=validated_data['city']
#         )
#         user.set_password(validated_data['password'])
#         user.save()
#         return user
#
#
# class RegisterResearcherSerializer(CreateUserMixin, serializers.ModelSerializer):
#     last_name = serializers.CharField(source="researcher.last_name")
#
#     class Meta(CreateUserMixin.Meta):
#         fields = CreateUserMixin.Meta.fields + ['last_name']
#
#     def create(self, validated_data):
#         user = super().create(validated_data)
#         # user.set_password(validated_data['password'])
#         # user.save()
#         researcher = u_models.ResearcherModel(
#             user=user,
#             last_name=validated_data['researcher']['last_name'],
#         )
#         researcher.save()
#         logger.debug(f"created researcher {researcher}")
#         return user
#
#
# class RegisterOrganizationSerializer(CreateUserMixin, serializers.ModelSerializer):
#
#     class Meta(CreateUserMixin.Meta):
#         pass
#
#     def create(self, validated_data):
#         user = super().create(validated_data)
#         # user.set_password(validated_data['password'])
#         # user.save()
#         organization = u_models.OrganizationModel(
#             user=user,
#         )
#         organization.save()
#         logger.debug(f"created organization {organization}")
#         return user
