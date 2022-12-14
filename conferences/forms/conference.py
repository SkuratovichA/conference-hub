# author: Khrystsiuk Dziyana

from django import forms
from django.db import transaction
from django.forms import ModelForm
from users import models as user_models
from django.utils.text import slugify
from djmoney.forms.fields import MoneyField
from django.utils import timezone

from conferences import models as conference_models


def date_check(date_from, date_to):
    if date_from and date_to:
        if date_from > date_to:
            raise forms.ValidationError("Conference should start before it ends")
        today = timezone.now().date()
        if date_from < today or date_to < today:
            raise forms.ValidationError("Can't create conference in the past")


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
        conf = super().save(commit=False)
        conf.organization = user_models.OrganizationModel.objects.get(user__username=user_slag)
        conf.slug = slugify(conf.name)
        conf.save()
        return conf

    def clean(self):
        cleaned_data = super(CreateConferenceForm, self).clean()

        conf_slug = slugify(cleaned_data.get("name"))
        search_by_slug = conference_models.ConferenceModel.objects.filter(slug=conf_slug)
        if search_by_slug:
            raise forms.ValidationError("Conference with the same or very similar name already exists. Please, change it.")

        date_from = cleaned_data.get("date_from")
        date_to = cleaned_data.get("date_to")

        date_check(date_from, date_to)


class CreateEventForm(ModelForm):
    date_time = forms.DateTimeField(
        input_formats=[f'%Y-%m-%d %H:%M'],
        widget=forms.DateInput(
            attrs={
                'placeholder': 'yyyy-mm-dd hh:mm',
            }
        )
    )
    duration = forms.DurationField(
        widget=forms.TextInput(
            attrs={
                'placeholder': 'hh:mm:ss',
            }
        )
    )
    description = forms.CharField(
        required=False,
        max_length=5000,
    )

    class Meta:
        model = conference_models.EventModel
        exclude = ('conference', 'type')
        widgets = {
            'conference': forms.HiddenInput(),
            'type': forms.HiddenInput(),
        }


class LectureForm(CreateEventForm):
    description = forms.CharField(
        widget=forms.Textarea(
            attrs={
                'rows': 10,
            }
        ),
        required=False,
        max_length=5000,
    )

    class Meta:
        model = conference_models.EventModel
        fields = ('name', 'location', 'date_time', 'duration', 'description',)

    @transaction.atomic
    def save(self, conf_slug, users_invite=None):
        event = super().save(commit=False)
        event.conference = conference_models.ConferenceModel.objects.get(slug=conf_slug)
        event.type = conference_models.EventModel.EventType.LECTURE
        event.save()
        lecture = conference_models.LectureModel.objects.create(
            event=event,
        )

        for user_login in users_invite:
            user = user_models.ConferenceUserModel.objects.get(username=user_login)
            invitation = conference_models.InviteModel.objects.get_or_create(lecture=lecture, user=user)

        return event


class LunchForm(CreateEventForm):
    price = MoneyField(max_digits=10, decimal_places=2)
    menu = forms.CharField(
        widget=forms.Textarea(
            attrs={
                'rows': 10,
            }
        ),
        max_length=250,
    )
    name = forms.Field(initial='Lunch')

    class Meta:
        model = conference_models.EventModel
        fields = ('name',  'location', 'date_time', 'duration', 'price', 'menu')

    @transaction.atomic
    def save(self, conf_slug, user_invites = None):
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


class EditLunchForm(ModelForm):
    menu = forms.CharField(
        widget=forms.Textarea(
            attrs={
                'rows': 10,
            }
        ),
        max_length=250,
    )

    class Meta:
        model = conference_models.LunchModel
        fields = ('price', 'menu')


class EditEventForm(ModelForm):
    description = forms.CharField(
        widget=forms.Textarea(
            attrs={
                'rows': 10,
            }
        ),
        required=False,
        max_length=5000,
    )

    class Meta:
        model = conference_models.EventModel
        exclude = ('conference', 'type')


class EditConferenceForm(ModelForm):
    class Meta:
        model = conference_models.ConferenceModel
        exclude = ('visitors', 'organization', 'slug')

    def clean(self):
        cleaned_data = super(EditConferenceForm, self).clean()

        date_from = cleaned_data.get("date_from")
        date_to = cleaned_data.get("date_to")

        date_check(date_from, date_to)
