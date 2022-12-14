# author: Skuratovich Aliaksandr

from users.auth_backend import ConferenceAuthenticationForm
from django.contrib.auth.forms import UserCreationForm
from django.utils.translation import gettext_lazy as _
from django.contrib.auth import views as views
from users.models import ConferenceUserModel
from django import forms


class ConferenceUserUpdateForm(forms.ModelForm):
    class Meta:
        model = ConferenceUserModel
        fields = ('email', 'username', 'name', 'country', 'city')


class ConferenceUserSignupForm(UserCreationForm):
    username = forms.CharField(
        widget=forms.TextInput(attrs={
            'autocomplete': 'username',
            'type': 'username',
            'placeholder': _('Username')
        })
    )
    email = forms.EmailField(
        label=_('Email'),
        max_length=254,
        widget=forms.EmailInput(attrs={
            'autocomplete': 'email',
            'placeholder': _('example@gmail.com')
        }),
    )
    name = forms.CharField(
        widget=forms.TextInput(attrs={  # TODO 14: probably, remove 'type' here. I don't know what it does tbh
            'type': 'name',
            'placeholder': _('First Name')
        }),
        max_length=128,
        min_length=1
    )
    password1 = forms.CharField(
        label=_('Password'),
        strip=False,
        widget=forms.PasswordInput(attrs={
            'autocomplete': "new-password",
            'type': 'password',
            'placeholder': _('Enter Password')
        }),
    )
    password2 = forms.CharField(
        label=_("Password confirmation"),
        strip=False,
        help_text=_("Enter the same password as before, for verification."),
        widget=forms.PasswordInput(attrs={
            'autocomplete': "new-password",
            'type': 'password',
            'placeholder': _('Repeat Password')
        }),
    )
    country = forms.CharField(
        widget=forms.TextInput(attrs={
            'autocomplete': 'country',
            # 'type': 'country',
            'placeholder': _('Country')
        }),
        required=False
    )
    city = forms.CharField(
        widget=forms.TextInput(attrs={
            'autocomplete': 'city',
            # 'type': 'city',
            'placeholder': _('City')
        }),
        required=False
    )

    class Meta(UserCreationForm.Meta):
        model = ConferenceUserModel
        fields = (
            'username',
            'name',
            'email',
            'country',
            'city',
            'password1',
            'password2',
        )


class ConferenceUserSigninForm(views.LoginView):
    form_class = ConferenceAuthenticationForm
    template_name = 'users/login.html'
