from django import forms
from django.db import transaction
from django.forms import ModelForm
from users import models as user_models
from django.utils.text import slugify

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
        exclude = ('organization', 'visitors', 'slug')
        widgets = {
            'organization': forms.HiddenInput(),
            'visitors': forms.HiddenInput(),
            'slug': forms.HiddenInput(),
        }

    @transaction.atomic
    def save(self, user_slag):
        # first, create a user
        conf = super().save(commit=False)
        conf.organization = user_models.OrganizationModel.objects.get(user__username=user_slag)
        conf.slug = slugify(conf.name)
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
        ),
        required=False
    )

    class Meta:
        model = conference_models.EventModel
        exclude = ('conference',)
        widgets = {
            'conference': forms.HiddenInput(),
        }

    @transaction.atomic
    def save(self, conf_slug):
        # first, create a user
        event = super().save(commit=False)
        event.conference = conference_models.ConferenceModel.objects.get(slug=conf_slug)
        event.save()
        return event


class EditConferenceForm(ModelForm):
    class Meta:
        model = conference_models.ConferenceModel
        exclude = ('visitors', 'organization')
