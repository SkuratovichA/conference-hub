from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db import models
from enum import Enum


class UserManager(BaseUserManager):

    def create_user(self, **kwargs):
        """
        kwargs:
            - id is a primary key - don't need to pass i (i suppose)
            - email
            - password
            - name
        """
        required_fields = ['email', 'password', 'name']
        for attr in required_fields:
            if attr not in kwargs.keys():
                raise ValueError(f'Attribute ({attr}) is required')
        email = self.normalize_email(kwargs.pop('email'))
        password = kwargs.pop('password')
        user = self.model(
            email=email,
            **kwargs
        )
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, **kwargs):
        user = self.create_user(
            **kwargs
        )
        user.is_superuser = True
        user.is_staff = True
        user.save(using=self._db)
        return user

    def create_users(self, email, password, name, **kwargs):
        user = self.create_user(email=email, password=password, name=name, **kwargs)
        user.save(using=self.db)
        return user


# https://medium.com/@harshithyadav96/e-mail-as-primary-key-in-custom-user-model-in-django-6f41eda2b394
class User(AbstractBaseUser, PermissionsMixin):
    id = models.AutoField(primary_key=True)
    email = models.CharField(max_length=128)
    name = models.CharField(max_length=64)

    active = models.BooleanField(default=True)
    verified = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    time_stamp = models.TimeField(auto_now_add=True)

    USERNAME_FIELD = 'id'
    REQUIRED_FIELDS = ['name', 'email']

    objects = UserManager()

    def __str__(self):
        return self.email


class LocationMixin:
    country = models.CharField(max_length=128)
    city = models.CharField(max_length=64)
    address = models.CharField(max_length=128)


class Organization(LocationMixin, User):
    user = models.OneToOneField(User, related_name='organization_base', on_delete=models.CASCADE, primary_key=True)


class Researcher(LocationMixin, User):
    user = models.OneToOneField(User, related_name='user_base', on_delete=models.CASCADE, primary_key=True)
    last_name = models.CharField(max_length=64)
    organization_user = models.ForeignKey(Organization, null=True, on_delete=models.SET_NULL)


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    image = models.ImageField(default='static/default.png', upload_to='profiles/profile_pics')

    def __str__(self):
        return f'[{self.user.id}] {self.user.email} Profile'
