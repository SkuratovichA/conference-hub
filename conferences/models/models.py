from users import models as user_models
from djmoney.models.fields import MoneyField
from django.db import models


class ConferenceModel(models.Model):
    name = models.CharField(max_length=250)
    slug = models.SlugField(unique=True, null=False)
    date_from = models.DateField('Begins on')
    date_to = models.DateField('Ends on')
    address = models.CharField(max_length=250)
    price = MoneyField(max_digits=10, decimal_places=2, default_currency='EUR', null=True)

    organization = models.ForeignKey(user_models.OrganizationModel, on_delete=models.CASCADE)
    visitors = models.ManyToManyField(user_models.ResearcherModel)

    def __str__(self):
        return f'{self.name}, {self.date_from} - {self.date_to}'

    @property
    def events_list(self):
        return self.event_set.all()


class EventModel(models.Model):
    conference = models.ForeignKey(ConferenceModel, on_delete=models.CASCADE, related_name='event_set', null=False)
    event_id = models.AutoField(primary_key=True)
    date_time = models.DateTimeField('Starts at')
    duration = models.DurationField()
    location = models.CharField(max_length=250)
    description = models.CharField(max_length=250, null=True)

    class Meta:
        unique_together = ['conference', 'event_id']


class LunchModel(EventModel):
    price = MoneyField(max_digits=10, decimal_places=2, default_currency='EUR')
    menu = models.CharField(max_length=250)
    customers = models.ManyToManyField(user_models.ResearcherModel)


class LectureModel(EventModel):
    name = models.CharField(max_length=250)
    researchers = models.ManyToManyField(user_models.ResearcherModel)
