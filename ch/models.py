from address.models import AddressField
from django.db import models
from djmoney.models.fields import MoneyField

from users.models import ConferenceUserModel, ResearcherModel


class Conference(models.Model):
    conf_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=250)
    date_from = models.DateField('Begins on')
    date_to = models.DateField('Ends on')
    address = AddressField(on_delete=models.CASCADE, null=True)
    price = MoneyField(max_digits=10, decimal_places=2, default_currency='EUR', null=True)

    # organization = models.ForeignKey(Organization)
    visitors = models.ManyToManyField(ResearcherModel)

    def __str__(self):
        return f'{self.name} {self.date_from} {self.date_to}'

    @property
    def events_list(self):
        return self.event_set.all()


class Event(models.Model):
    conference = models.ForeignKey(Conference, on_delete=models.CASCADE)
    event_id = models.AutoField(primary_key=True)
    date_time = models.DateTimeField('Starts at')
    duration = models.DurationField()
    location = models.CharField(max_length=250)
    description = models.CharField(max_length=250, null=True)

    class Meta:
        unique_together = ['conference', 'event_id']


class Lunch(Event):
    price = MoneyField(max_digits=10, decimal_places=2, default_currency='EUR')
    menu = models.CharField(max_length=250)
    customers = models.ManyToManyField(ConferenceUserModel)


class Lecture(Event):
    name = models.CharField(max_length=250)
    researchers = models.ManyToManyField(ResearcherModel)
