from django import forms
from django.db import transaction
from django.forms import ModelForm
from users import models as user_models
from django.utils.text import slugify
from djmoney.forms.fields import MoneyField

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

    class Meta:
        model = conference_models.EventModel
        exclude = ('conference', 'type')
        widgets = {
            'conference': forms.HiddenInput(),
            'type': forms.HiddenInput(),
        }


class LectureForm(CreateEventForm):
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
        fields = ('name', 'location', 'date_time', 'duration', 'description',)

    @transaction.atomic
    def save(self, conf_slug):
        event = super().save(commit=False)
        event.conference = conference_models.ConferenceModel.objects.get(slug=conf_slug)
        event.type = conference_models.EventModel.EventType.LECTURE
        event.save()
        lecture = conference_models.LectureModel.objects.create(
            event=event,
        )
        return event


class LunchForm(CreateEventForm):
    price = MoneyField(max_digits=10, decimal_places=2, default_currency='EUR')
    menu = forms.Field(
        widget=forms.Textarea(
            attrs={
                'rows': 10,
            }
        ),
    )
    name = forms.Field(initial='Lunch')

    class Meta:
        model = conference_models.EventModel
        fields = ('name',  'location', 'date_time', 'duration', 'price', 'menu')
        widgets = {
            'description': forms.HiddenInput(),
        }

    @transaction.atomic
    def save(self, conf_slug):
        event = super().save(commit=False)
        event.conference = conference_models.ConferenceModel.objects.get(slug=conf_slug)
        event.type = conference_models.EventModel.EventType.LUNCH
        event.save()
        lunch = conference_models.LunchModel.objects.create(
            event=event,
            menu=self.cleaned_data.get('menu'),
            price=self.cleaned_data.get('price'),
        )
        return event


class EditConferenceForm(ModelForm):
    class Meta:
        model = conference_models.ConferenceModel
        exclude = ('visitors', 'organization')
