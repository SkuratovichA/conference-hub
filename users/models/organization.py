from .conferenceuser import ConferenceUser
from django.db import models


class Organization(models.Model):
    user = models.OneToOneField(
        ConferenceUser,
        related_name='organization_base',
        on_delete=models.CASCADE,
        primary_key=True
    )
