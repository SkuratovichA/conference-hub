from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.utils.translation import gettext_lazy as _
from .managers import ConferenceUserManager
from django.core.mail import send_mail
from django.utils import timezone
from django.db import models


class ConferenceUserModel(AbstractBaseUser, PermissionsMixin):
    # required fields
    username = models.CharField('username', max_length=64, unique=True, null=False, blank=False)
    email = models.CharField("email address", max_length=64, unique=True, null=False, blank=False)

    name = models.CharField("name", max_length=64)
    # dev flags
    is_active = models.BooleanField("active", default=True)
    is_superuser = models.BooleanField("superuser", default=False)
    is_staff = models.BooleanField("staff status", default=False)  # TODO 1: remove? AbstractUser has it, but we probably dont need to
    # roles
    is_researcher = models.BooleanField(default=False)
    is_organization = models.BooleanField(default=False)
    is_verified = models.BooleanField(default=False)
    date_joined = models.DateTimeField("date joined", default=timezone.now)
    # address  # TODO 3: add address
    # address = models.ForeignKey(to=AddressModel, on_delete=models.SET_NULL, related_name='Address')

    EMAIL_FIELD = 'email'
    USERNAME_FIELD = 'username'  # use username as a username field, but actually there are two username fields

    # NOTE: signatures of attributes "username" and "email" MUST be the same
    # This is not the best way to deal with it by a comment in the code, and it needs further checking, but
    # I don't have time to compare all possible fields in the database. Just be careful and specify it in
    # conference_hub.utils.constraints.
    USERNAME_FIELDS = ['username', 'email']
    REQUIRED_FIELDS = ['name']

    objects = ConferenceUserManager()

    class Meta:
        verbose_name = _("User")
        verbose_name_plural = _("Users")

    def __str__(self):
        return self.email

    def clean(self):
        super().clean()
        self.email = self.__class__.objects.normalize_email(self.email)

    def email_user(self, subject, message, from_email=None, **kwargs):
        send_mail(subject, message, from_email, [self.email], **kwargs)

    def get_short_name(self):
        return self.name

    def get_full_name(self):
        return self.name
