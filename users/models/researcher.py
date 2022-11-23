import users.models as users_models
from django.db import models
import conferences.models as conf_models
from django.db.models import Q


class ResearcherModel(models.Model):
    class Meta:
        permissions = (('researcher', 'Can do stuff researchers usually do'), )

    user = models.OneToOneField(
        users_models.ConferenceUserModel,
        related_name='researcher',
        on_delete=models.CASCADE,
        primary_key=True
    )
    last_name = models.CharField(max_length=64)
    date_of_birth = models.DateField()

    def get_full_name(self):
        """
        Return the first_name + the last_name, with a space in between
        """
        full_name = f"{self.user.name} {self.last_name}"
        return full_name

    def get_invites(self):
        # print(conf_models.InviteModel.objects.filter(Q(user=self.user) & Q(approved=False)))
        return conf_models.InviteModel.objects.filter(Q(user=self.user) & Q(approved=False))

    def get_number_invites(self):
        # print(len(conf_models.InviteModel.objects.filter(user=self.user)))
        return len(conf_models.InviteModel.objects.filter(user=self.user))

    def get_smth(self):
        return 2

    def __str__(self):
        return f'{self.user} Researcher'
