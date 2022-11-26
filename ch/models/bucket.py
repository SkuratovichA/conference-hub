from django.db import models
import users.models as users_models
import conferences.models as conf_models
from django.utils import timezone


class PurchasesModel(models.Model):
    researcher = models.ForeignKey(
        users_models.ResearcherModel,
        on_delete=models.CASCADE,
        null=False
    )

    conference = models.ForeignKey(
        conf_models.ConferenceModel,
        on_delete=models.CASCADE,
        null=False
    )

    status = models.BooleanField(default=False)
    date = models.DateField(default=timezone.now)

    class Meta:
        unique_together = ['conference', 'researcher']
