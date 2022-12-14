# author: Shchapaniak Andrei

from rest_framework import serializers
from users.serializers import ResearcherInfoSerializer, ConferenceUserSerializer, OrganizationInfoSerializer
from conferences.serializers import ConferenceSerializer
import logging
import ch.models as ch_models
from django.contrib.auth.password_validation import validate_password

logger = logging.getLogger(__name__)

class PurchaseSerializerSlug(serializers.HyperlinkedModelSerializer):
    researcher = ResearcherInfoSerializer
    conference = ConferenceSerializer

    class Meta:
        model = ch_models.PurchasesModel
        fields = ['researcher', 'conference', 'status']
        extra_field_kwargs = {'url': {'lookup_field': 'slug'}}


class PurchaseSerializer(serializers.ModelSerializer):
    researcher = ResearcherInfoSerializer
    conference = ConferenceSerializer

    class Meta:
        model = ch_models.PurchasesModel
        fields = ['researcher', 'conference', 'status']
