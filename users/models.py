from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin


class UserManager(BaseUserManager):

    def create_user(self, **kwargs):
        """
        kwargs:
            - email
            - password
            - first_name
            - last_name
        """
        required_fields = ['email', 'password', 'first_name', 'last_name']
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

    def create_users(self, email, password, first_name, last_name, **kwargs):
        user = self.create_user(email=email, password=password, first_name=first_name, last_name=last_name, **kwargs)
        user.save(using=self.db)
        return user


# https://medium.com/@harshithyadav96/e-mail-as-primary-key-in-custom-user-model-in-django-6f41eda2b394
class User(AbstractBaseUser, PermissionsMixin):
    email = models.CharField(primary_key=True, max_length=128)
    first_name = models.CharField(max_length=256)
    last_name = models.CharField(max_length=256)
    date_of_birth = models.DateField(null=True)

    active = models.BooleanField(default=True)
    validated = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    time_stamp = models.TimeField(auto_now_add=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name']

    objects = UserManager()

    def get_first_name(self):
        return self.first_name

    def get_last_name(self):
        return self.first_name

    def get_date_of_birth(self):
        return self.date_of_birth

    def get_email(self):
        return self.email

    def __str__(self):
        return self.email


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    image = models.ImageField(default='default.png', upload_to='static/profile_pics')

    def __str__(self):
        return f'{self.user.email} Profile'