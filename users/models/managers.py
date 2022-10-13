# TODO 6: remove kostyli ebanye
from django.contrib.auth.models import BaseUserManager
from django.contrib.auth.hashers import make_password

# TODO 2: add PermissionsMixin. Why? Because AbstractUser class has it. By adding PermisionsMixin it is not necessary to set some attributes & implement some functions
class UserManager(BaseUserManager):
    use_in_migrations = True

    def _create_user(self, **extra_fields):
        required_fields = ('email', 'password', 'name')
        for attr in required_fields:
            if attr not in extra_fields.keys() or not extra_fields.get(attr):
                raise ValueError(f'Attribute ({attr}) must be set')
        email = self.normalize_email(extra_fields.pop('email'))
        password = extra_fields.pop('password')
        user = self.model(
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

