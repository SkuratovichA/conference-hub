from .organization import Organization
from .conferenceuser import ConferenceUser
from django.db import models


class Researcher(models.Model):
    user = models.OneToOneField(
        ConferenceUser,
        related_name='conferenceuser_base',
        on_delete=models.CASCADE,
        primary_key=True
    )
    last_name = models.CharField(max_length=64)
    organization_user = models.ForeignKey(
        Organization,
        null=True,
        on_delete=models.SET_NULL
    )
    date_of_birth = models.DateField()

    def get_full_name(self):
        """
        Return the first_name + the last_name, with a space in between
        """
        full_name = f"{self.user.name} {self.last_name}"
        return full_name

