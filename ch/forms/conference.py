from django.forms import ModelForm 
from django import forms
from ch.models import Conference, Event
from django.db import transaction

class CreateConferenceForm(ModelForm):
	date_from = forms.DateField(
        input_formats=[f'%d.%m.%Y'],
		widget=forms.DateInput(
            attrs={
                'placeholder': 'dd.mm.yyyy',
            }
        )
	)

	date_to = forms.DateField(
		input_formats=[f'%d.%m.%Y'],
			widget=forms.DateInput(
			attrs={
				'placeholder': 'dd.mm.yyyy',
			}
		)
	)

	class Meta:
		model = Conference
		fields = ["name", "date_from", "date_to", "address", "price"]
	
	@transaction.atomic
	def save(self):
		# first, create a user
		conf = super().save(commit=False)
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
		model = Event
		fields = '__all__'
	
	# def __init__(self, *args, **kwargs):
	# 	conf = kwargs.pop('conf','')
	# 	super().__init__(*args, **kwargs)
	# 	self.fields['conference']=forms.ModelChoiceField(queryset=Conference.objects.filter(pk=conf))

	@transaction.atomic
	def save(self):
		# first, create a user
		event = super().save(commit=False)
		event.save()
		return event