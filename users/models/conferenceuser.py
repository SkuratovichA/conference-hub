from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.utils.translation import gettext_lazy as _
from .managers import ConferenceUserManager
from django.core.validators import EmailValidator, validate_slug
from django.core.mail import send_mail
from django.utils import timezone
from django.urls import reverse
from django.db import models
from djmoney.models.fields import MoneyField
import logging


logger = logging.getLogger(__name__)


class ConferenceUserModel(AbstractBaseUser, PermissionsMixin):
    # required fields
    username = models.CharField(
        max_length=64,
        # validators=[validate_slug],
        # unique=True,
    )
    email = models.CharField(
        "email address",
        max_length=64,
        # validators=[EmailValidator(message="invalid email")],
        # unique=True,
    )
    name = models.CharField(
        "name",
        max_length=64,
    )
    # dev flags
    is_active = models.BooleanField(
        "active",
        default=True
    )
    is_superuser = models.BooleanField(
        "superuser",
        default=False
    )
    is_staff = models.BooleanField(
        "staff status",
        default=False
    )  # TODO 1: remove? AbstractUser has it, but we probably dont need to
    # roles
    is_researcher = models.BooleanField(default=False)
    is_organization = models.BooleanField(default=False)
    is_verified = models.BooleanField(default=False)
    date_joined = models.DateTimeField("date joined", default=timezone.now)
    status = models.BooleanField(default=False)

    country = models.CharField(null=True, blank=False, max_length=64)
    city = models.CharField(null=True, blank=False, max_length=64)
    balance = MoneyField(max_digits=10, decimal_places=2, default_currency='EUR', default=1000      )

    USERNAME_FIELD = 'id'  # use username as a username field, but actually there are two username fields

    # NOTE: signatures of attributes "username" and "email" MUST be the same
    # This is not the best way to deal with it by a comment in the code, and it needs further checking, but
    # I don't have time to compare all possible fields in the database. Just be careful and specify it in

    objects = ConferenceUserManager()

    class Meta:
        verbose_name = _("User")
        verbose_name_plural = _("Users")

    def __str__(self):
        return self.email

    def address(self):
        if not self.country or not self.city:
            return False
        return f'{self.city}, {self.country}'

    def clean(self):
        super().clean()
        self.email = self.__class__.objects.normalize_email(self.email)

    def email_user(self, subject, message, from_email=None, **kwargs):
        send_mail(subject, message, from_email, [self.email], **kwargs)

    def get_short_name(self):
        return self.name

    def get_full_name(self):
        return self.name

    def get_absolute_url(self):
        return reverse("users:profile-page", kwargs={"slug": self.username})
