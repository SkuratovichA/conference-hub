from django.db import models
from users.models import OrganizationModel, ResearcherModel
from datetime import datetime


class OrganizationEmployeeModel(models.Model):
    organization = models.ForeignKey(OrganizationModel, on_delete=models.CASCADE)
    researcher = models.ForeignKey(ResearcherModel, on_delete=models.CASCADE)
    brief = models.CharField(null=True, max_length=64, default='Welcome to our organization!')
    date_hired = models.DateField(null=True, default=datetime.now)
    date_fired = models.DateField(null=True)

    date_sent = models.DateField(null=False, default=datetime.now)
    role = models.CharField(null=False, max_length=32)

    approved = models.BooleanField(null=False, default=False)
    rejected = models.BooleanField(null=False, default=False)

    def __str__(self):
        s = f'{self.organization}: {self.researcher}\n' \
            f'\tbrief: {self.brief}\n' \
            f'\tfrom {self.date_hired} to {self.date_fired}\n' \
            f'\tOn {self.role}\n' \
            "\t" + "" if self.approved else "NOT" + "working"
        return s

    def get_role(self):
        return self.role or 'Technical stuff'

    def get_date_hired(self):
        return self.date_hired or 'Permanent'
