import users.models as user_models
from djmoney.models.fields import MoneyField
from django.db import models
from enum import Enum


class ConferenceModel(models.Model):
    name = models.CharField(max_length=250)
    brief = models.CharField(null=True, blank=True, default='')
    slug = models.SlugField(unique=True, null=False)
    date_from = models.DateField('Begins on')
    date_to = models.DateField('Ends on')
    address = models.CharField(max_length=250)
    price = MoneyField(max_digits=10, decimal_places=2, default_currency='EUR', null=True)

    organization = models.ForeignKey(user_models.OrganizationModel, on_delete=models.CASCADE)
    visitors = models.ManyToManyField(user_models.ConferenceUserModel)

    def __str__(self):
        return f'{self.name}, {self.date_from} - {self.date_to}'

    @property
    def events_list(self):
        return self.event_set.all()


class EventModel(models.Model):
    class EventType(models.TextChoices):
        LUNCH = 'lunch'
        LECTURE = 'lecture'
        POSTER = 'poster'

    conference = models.ForeignKey(ConferenceModel, on_delete=models.CASCADE, related_name='event_set')
    event_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=250)
    date_time = models.DateTimeField('Starts at')
    duration = models.DurationField()
    location = models.CharField(max_length=250)
    description = models.CharField(max_length=5000, null=True)
    type = models.CharField(
        max_length=7,
        choices=EventType.choices,
        default=EventType.LECTURE
    )

    class Meta:
        unique_together = ['conference', 'event_id']

    def __str__(self):
        return f'{self.name} {self.date_time} {self.location}'

    def get_researchers(self):
        if self.type == 'lecture':
            return self.lecture.researchers.all()
        else:
            return None


class LunchModel(models.Model):
    event = models.OneToOneField(
        EventModel,
        related_name='lunch',
        on_delete=models.CASCADE,
        primary_key=True)
    price = MoneyField(max_digits=10, decimal_places=2, default_currency='EUR')
    menu = models.CharField(max_length=250)
    customers = models.ManyToManyField(user_models.ConferenceUserModel)


class LectureModel(models.Model):
    event = models.OneToOneField(
        EventModel,
        related_name='lecture',
        on_delete=models.CASCADE,
        primary_key=True)


class InviteModel(models.Model):
    lecture = models.ForeignKey(
        LectureModel,
        related_name='researchers',
        on_delete=models.CASCADE,
    )
    user = models.ForeignKey(
        user_models.ConferenceUserModel,
        related_name='invitation',
        on_delete=models.CASCADE,
    )
    approved = models.BooleanField(default=False)

    def __str__(self):
        return f'{self.user.name} {self.user.researcher.last_name}'

    class Meta:
        unique_together = ['lecture', 'user']
