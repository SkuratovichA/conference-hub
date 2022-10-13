from django.contrib.auth.forms import UserCreationForm
from django.utils.translation import gettext_lazy as _
from users.models import ConferenceUserModel
from django import forms


class ConferenceUserForm(UserCreationForm):
    password1 = forms.CharField(
        label=_("Password"),
        strip=False,
        widget=forms.PasswordInput(attrs={
            "autocomplete": "new-password",
            'type': 'password',
            'placeholder': _('Enter Password')
        }),
    )
    password2 = forms.CharField(
        label=_("Password confirmation"),
        strip=False,
        help_text=_("Enter the same password as before, for verification."),
        widget=forms.PasswordInput(attrs={
            "autocomplete": "new-password",
            'type': 'password',
            'placeholder': _('Repeat Password')
        }),
    )
    email = forms.EmailField(
        label=_("Email"),
        max_length=254,
        widget=forms.EmailInput(attrs={"autocomplete": "email"}),
    )
    name = forms.CharField(
        widget=forms.TextInput(
            attrs={
                'type': 'name',
                'placeholder': _('First Name')
            }
        ),
        max_length=128,
        min_length=1
    )

    class Meta(UserCreationForm.Meta):
        model = ConferenceUserModel
        fields = (
            'name',
            'email',
            'password1',
            'password2',
        )
