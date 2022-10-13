from .conferenceuser import ConferenceUser
from django.db import models


class Profile(models.Model):
    user = models.OneToOneField(ConferenceUser, on_delete=models.CASCADE)
    image = models.ImageField(default='static/default.png', upload_to='profiles/profile_pics')
