from django.utils.translation import gettext_lazy as _
from users.models import ConferenceUserModel
from django.urls import reverse
from django.db import models
import logging
from PIL import Image

logger = logging.getLogger(__name__)


class ProfileModel(models.Model):
    user = models.OneToOneField(ConferenceUserModel, related_name='profile', on_delete=models.CASCADE)
    image = models.ImageField(default='static/default.png', upload_to='profiles/profile_pics')
    country = models.CharField(max_length=128, null=True, blank=False)
    city = models.CharField(max_length=64, null=True, blank=False)


    def __str__(self):
        return f'{self.user.username} Profile'

    def save(self, force_insert=False, force_update=False, using=None, update_fields=None):
        super().save()
        img = Image.open(self.image.path)
        if img.height > 300 or img.width > 300:
            img.thumbnail((300, 300))
            img.save(self.image.path)

    def __str__(self):
        return f'Profile: [{self.user}]'

    def has_address(self):
        logger.debug(f'has address: {self.country} and {self.city}')
        return self.country and self.city

    def get_address(self):
        return f'{self.city}, {self.country}'
