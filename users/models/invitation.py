from users.models import ResearcherModel, OrganizationModel
from conferences.models import ConferenceModel
from django.db import models


class InvitationModel(models.Model):
    organization = models.OneToOneField(OrganizationModel, on_delete=models.CASCADE)
    researcher = models.OneToOneField(ResearcherModel, on_delete=models.CASCADE)
    conference = models.OneToOneField(ConferenceModel, on_delete=models.CASCADE)
    date_from = models.DateField('Start')
    date_to = models.DateField('End')
