from users.models import ConferenceUserModel, ProfileModel
from django.db.models.signals import post_save
from django.dispatch import receiver


# TODO 9: find out how signals are used, when they are useful, and how they can be used in the project
@receiver(post_save, sender=ConferenceUserModel)
def create_profile(sender, instance, created, **kwargs):
    if created:
        ProfileModel.objects.create(user=instance)


@receiver(post_save, sender=ConferenceUserModel)
def save_profile(sender, created, instance, **kwargs):
    if not created:
        instance.profilemodel.save()
