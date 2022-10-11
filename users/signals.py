from django.db.models.signals import post_save
from .models import ConferenceUser, Profile
from django.dispatch import receiver


@receiver(post_save, sender=ConferenceUser)
def create_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)
        print('profile created')


@receiver(post_save, sender=ConferenceUser)
def save_profile(sender, instance, **kwargs):
    instance.profile.save()
