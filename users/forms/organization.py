# author: Skuratovich Aliaksandr

from users.forms import ConferenceUserSignupForm
from users.models import OrganizationModel, ConferenceUserModel
from django.db import transaction
from django import forms


class OrganizationUpdateForm(forms.ModelForm):

    class Meta:
        model = OrganizationModel
        fields = []


class OrganizationSignupForm(ConferenceUserSignupForm):

    # TODO 14: change html from 'name' to 'Company name',
    class Meta(ConferenceUserSignupForm):
        model = ConferenceUserModel
        fields = ('email', 'username', 'name', 'country', 'city', 'password1', 'password2')

    @transaction.atomic
    def save(self, commit=True):
        user = super().save(commit=False)
        user.is_organization = True
        user.save()
        organization = OrganizationModel.objects.create(user=user)
        return user
