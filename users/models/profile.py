from users.models import ConferenceUserModel
from django.db import models


class ProfileModel(models.Model):
    user = models.OneToOneField(ConferenceUserModel, on_delete=models.CASCADE)
    image = models.ImageField(default='static/default.png', upload_to='profiles/profile_pics')
