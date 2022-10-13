from users.models.conferenceuser import ConferenceUser
from users.models.profile import Profile
from django.dispatch import receiver
from django.db.models.signals import post_save


# TODO 9: find out how signals are used, when they are useful, and how they can be used in the project
@receiver(post_save, sender=ConferenceUser)
def create_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)


@receiver(post_save, sender=ConferenceUser)
def save_profile(sender, instance, **kwargs):
    instance.profile.save()
