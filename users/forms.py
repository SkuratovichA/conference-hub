from django import forms
from django.db import transaction
# from django.contrib.auth.models import User
from django.utils.translation import gettext_lazy as _
from django.contrib.auth.forms import UserCreationForm
from .models import ConferenceUser, Profile, Researcher, Organization


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
        model = ConferenceUser
        fields = (
            'name',
            'email',
            'password1',
            'password2',
        )


class ResearcherForm(ConferenceUserForm):
    last_name = forms.CharField(
        widget=forms.TextInput(
            attrs={
                'type': 'last_name',
                'placeholder': _('Last Name')
            }
        ),
        max_length=128,
        min_length=1
    )
    date_of_birth = forms.DateField(
        input_formats=[f'%d{s}%m{s}%Y' for s in '. / -'.split()],
        widget=forms.DateInput(
            attrs={
                'type': 'date of birth',
                'class': 'form-control',
            }
        )
    )

    class Meta:
        model = ConferenceUser
        fields = ('email', 'name', 'last_name', 'date_of_birth', 'password1', 'password2')

    @transaction.atomic
    def save(self):
        # first, create a user
        user = super().save(commit=False)
        user.is_researcher = True
        user.save()
        # FIXME: create function is fucked up
        # then, create a researcher and attach a user to it
        researcher = Researcher.objects.create(
            user=user,
            last_name=self.cleaned_data.get('last_name'),
            date_of_birth=self.cleaned_data.get('date_of_birth')
        )
        # researcher.save()
        return user


class OrganizationForm(ConferenceUserForm):

    def save(self, commit=True):
        user = super().save(commit=False)
        user.is_organization = True
        user.save()
        organization = Organization.objects.create(user=user)
        organization.save()
        return user


class UserUpdateForm(forms.ModelForm):
    email = forms.EmailField()

    class Meta:
        model = ConferenceUser
        fields = ('name', 'email')


class ProfileUpdateForm(forms.ModelForm):
    class Meta:
        model = Profile
        fields = ('image',)
