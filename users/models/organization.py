from users.models import ConferenceUserModel
from django.db import models


class OrganizationModel(models.Model):
    user = models.OneToOneField(
        ConferenceUserModel,
        related_name='organization_base',
        on_delete=models.CASCADE,
        primary_key=True
    )
