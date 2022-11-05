from django import forms
from django.db import transaction
from django.forms import ModelForm
from users import models as user_models

from conferences import models as conference_models


class CreateConferenceForm(ModelForm):
    date_from = forms.DateField(
        # TODO on update it has the myscl format, so until solved let it be in the same format here
        input_formats=[f'%Y-%m-%d'],
        widget=forms.DateInput(
            attrs={
                'placeholder': 'yyyy-mm-dd',
            }
        )
    )

    date_to = forms.DateField(
        input_formats=[f'%Y-%m-%d'],
        widget=forms.DateInput(
            attrs={
                'placeholder': 'yyyy-mm-dd',
            }
        )
    )

    class Meta:
        model = conference_models.ConferenceModel
        fields = ["name", "date_from", "date_to", "address", "price"]
        widgets = {
            'organization': forms.HiddenInput(),
        }

    @transaction.atomic
    def save(self, user_slag):
        # first, create a user
        conf = super().save(commit=False)
        conf.organization = user_models.ConferenceUserModel.objects.get(username=user_slag, is_organization=True).organization
        conf.save()
        return conf


class CreateEventForm(ModelForm):
    date_time = forms.DateTimeField(
        input_formats=[f'%d.%m.%Y %H:%M'],
        widget=forms.DateInput(
            attrs={
                'placeholder': 'dd.mm.yyyy hh:mm',
            }
        )
    )

    description = forms.Field(
        widget=forms.Textarea(
            attrs={
                'rows': 10,
            }
        )
    )

    class Meta:
        model = conference_models.EventModel
        exclude = ('conference',)
        widgets = {
            'conference': forms.HiddenInput(),
        }

    @transaction.atomic
    def save(self, conf_id):
        # first, create a user
        event = super().save(commit=False)
        event.conference = conference_models.ConferenceModel.objects.get(conf_id=conf_id)
        event.save()
        return event


class EditConferenceForm(ModelForm):
    class Meta:
        model = conference_models.ConferenceModel
        exclude = ('visitors', 'organization')
