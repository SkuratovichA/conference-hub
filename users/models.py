from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.utils.translation import gettext_lazy as _
from django.contrib.auth.hashers import make_password
from django.core.mail import send_mail
from django.utils import timezone
from django.apps import apps
from django.db import models
from enum import Enum


# TODO: add PermissionsMixin. Why? Because AbstractUser class has it. By adding PermisionsMixin it is not necessary to set some attributes & implement some functions
class UserManager(BaseUserManager):
    use_in_migrations = True

    def _create_user(self, **extra_fields):
        required_fields = (
            # 'id', # django does it implicitly
            'email', 'password', 'name')
        for attr in required_fields:
            if attr not in extra_fields.keys() or not extra_fields.get(attr):
                raise ValueError(f'Attribute ({attr}) must be set')
        # id = extra_fields.pop('id') # django does it implicitly
        email = self.normalize_email(extra_fields.pop('email'))
        password = extra_fields.pop('password')
        user = self.model(
            # id=id,
            email=email,
            **extra_fields
        )
        user.password = make_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, **kwargs):
        kwargs.setdefault('is_staff', False)  # TODO 1: remove? AbstractUser has it, but we probably dont need to
        kwargs.setdefault('is_superuser', False)
        return self._create_user(**kwargs)

    def create_superuser(self, **kwargs):
        defaults = ('is_staff', 'is_superuser')
        for d in defaults:
            kwargs.setdefault(d, True)
            if (kd := kwargs.get(d)) is not True:
                raise ValueError(f'Superuser must have {d}==True. {kd} provided')
        return self._create_user(**kwargs)


class ConferenceUser(AbstractBaseUser, PermissionsMixin):
    """
    Initially taken from:
         https://medium.com/@harshithyadav96/e-mail-as-primary-key-in-custom-user-model-in-django-6f41eda2b394
    Then, modified with:
        https://simpleisbetterthancomplex.com/tutorial/2018/01/18/how-to-implement-multiple-user-types-with-django.html
    """

    # required fields
    id = models.AutoField(_("id"), primary_key=True) # django does it implicitly
    email = models.CharField(_("email address"), max_length=128, unique=True)
    name = models.CharField(_("name"), max_length=64)

    is_active = models.BooleanField(_("active"), default=True)
    is_superuser = models.BooleanField(_("superuser"), default=False)
    is_staff = models.BooleanField(_("staff status"), default=False)  # TODO 1: remove? AbstractUser has it, but we probably dont need to
    date_joined = models.DateTimeField(_("date joined"), default=timezone.now)

    verified = models.BooleanField(default=False)
    is_researcher = models.BooleanField(default=False)
    is_organization = models.BooleanField(default=False)

    EMAIL_FIELD = 'email'
    USERNAME_FIELD = 'id'
    REQUIRED_FIELDS = ['name']

    objects = UserManager()

    class Meta:
        verbose_name = _("user")
        verbose_name_plural = _("users")

    def __str__(self):
        return self.email

    def clean(self):
        super().clean()
        self.email = self.__class__.objects.normalize_email(self.email)

    def email_user(self, subject, message, from_email=None, **kwargs):
        send_mail(subject, message, from_email, [self.email], **kwargs)

    def get_short_name(self):
        """Return the short name for the user"""
        return self.name


class LocationMixin:
    country = models.CharField(max_length=128)
    city = models.CharField(max_length=64)
    address = models.CharField(max_length=128)


class Organization(LocationMixin, ConferenceUser):
    user = models.OneToOneField(
        ConferenceUser,
        related_name='organization_base',
        on_delete=models.CASCADE,
        primary_key=True
    )


class Researcher(LocationMixin, ConferenceUser):
    user = models.OneToOneField(
        ConferenceUser,
        related_name='conferenceuser_base',
        on_delete=models.CASCADE,
        primary_key=True
    )
    last_name = models.CharField(max_length=64)
    organization_user = models.ForeignKey(
        Organization,
        null=True,
        on_delete=models.SET_NULL
    )

    def get_full_name(self):
        """
        Return the first_name + the last_name, with a space in between
        """
        full_name = f"{self.name} {self.last_name}"
        return full_name


class Profile(models.Model):
    user = models.OneToOneField(ConferenceUser, on_delete=models.CASCADE)
    image = models.ImageField(default='static/default.png', upload_to='profiles/profile_pics')

    def __str__(self):
        return f'[{self.user.id}] {self.user.email} Profile'
