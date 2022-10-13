from users.models import OrganizationModel, ConferenceUserModel
from django.db import models


class ResearcherModel(models.Model):
    user = models.OneToOneField(
        ConferenceUserModel,
        related_name='conferenceuser_base',
        on_delete=models.CASCADE,
        primary_key=True
    )
    last_name = models.CharField(max_length=64)
    organization_user = models.ForeignKey(
        OrganizationModel,
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

