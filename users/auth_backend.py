from django.contrib.auth import backends, get_user_model, authenticate
from django.utils.translation import gettext_lazy as _
from django.core.exceptions import ValidationError
from django.contrib.auth.forms import UsernameField
from django.db.models import Q
from django.utils.text import capfirst
from django import forms

UserModel = get_user_model()


class ConferenceAuthBackend(backends.ModelBackend):
    """
    Custom authentication backend for login using email/username and password
    """

    def authenticate(self, request, username=None, password=None, **kwargs):
        if not username or not password:
            return
        try:
            user = get_user_model().objects.get(
                Q(username__iexact=username) | Q(email__iexact=username)
            )
        except UserModel.DoesNotExist:
            # Run the default password hasher once to reduce the timing
            # difference between an existing and a nonexistent user (#20760).
            UserModel().set_password(password)
        else:
            if user.check_password(password) and self.user_can_authenticate(user):
                return user


class ConferenceAuthenticationForm(forms.Form):
    """
    Base class for authenticating conference users.
    Taken from django.contrib.auth.forms.AuthenticationForm and modified.
    """
    username = UsernameField(widget=forms.TextInput(attrs={
        'autocomplete': 'username',
        'autofocus': True
    }))
    password = forms.CharField(
        label=_("Password"),
        strip=False,
        widget=forms.PasswordInput(attrs={"autocomplete": "current-password"})
    )
    error_messages = {
        "invalid_login": _(
            _("Please enter a correct %(username)s and password.")
        ),
        "inactive": _("This account is inactive."),
    }

    def __init__(self, request=None, *args, **kwargs):
        self.request = request
        self.user_cache = None
        super().__init__(*args, **kwargs)

        # set the max length and label for the "username/email" field.
        self.username_field = UserModel._meta.get_field(UserModel.USERNAME_FIELD)
        self.username_fields = UserModel.USERNAME_FIELDS
        username_max_length = self.username_field.max_length or 254  # TODO CM
        self.fields['username'].max_length = username_max_length
        self.fields['username'].widget.attrs['maxlength'] = username_max_length
        if self.fields['username'].label is None:
            self.fields['username'].label = capfirst(' '.join(' or '.join(UserModel.USERNAME_FIELDS).split(' ')))

    def clean(self):
        username = self.cleaned_data.get('username')
        password = self.cleaned_data.get('password')

        if username is not None and password:
            self.user_cache = authenticate(
                self.request, username=username, password=password
            )
            if self.user_cache is None:
                raise self.get_invalid_login_error()
            else:
                self.confirm_login_allowed(self.user_cache)

        return self.cleaned_data

    def confirm_login_allowed(self, user):
        """
        Controls whether the given User may log in. this is a policy sessing,
        independent of end-user authentication. This default behavior is to
        allow login by activate users, and reject login by inactive users.

        If the given users cannot log in, this method should raise a ``ValidationError``

        If the given user may log in, this method should return None
        """
        # TODO 13: add a possibility to deactivate users.
        if not user.is_active:
            raise ValidationError(
                self.error_messages['inactive'],
                code='inactive'
            )

    def get_user(self):
        return self.user_cache

    def get_invalid_login_error(self):
        return ValidationError(
            self.error_messages['invalid_login'],
            code='invalid_login',
            params={'username': 'or '.join(self.username_fields)}
        )
