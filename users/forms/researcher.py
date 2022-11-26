from django.utils.translation import gettext_lazy as _
from users.models import ConferenceUserModel, ResearcherModel
from users.forms import ConferenceUserSignupForm
from django.db import transaction
from django import forms
import logging


logger = logging.getLogger(__name__)


class ResearcherUpdateForm(forms.ModelForm):
    last_name = forms.CharField(
        widget=forms.TextInput(
            attrs={
                'type': 'last_name',
                'placeholder': _('Last Name'),
            }
        ),
        max_length=64,
        min_length=1
    )

    class Meta:
        model = ResearcherModel
        fields = ('last_name', )


class ResearcherSignupForm(ConferenceUserSignupForm):
    # TODO 14: change 'name' -> First Name in html attributes
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
        input_formats=[f'%Y-%m-%d'],
        widget=forms.DateInput(
            attrs={
                'placeholder': 'yyyy-mm-dd',
                'type': 'date of birth',
                'class': 'form-control',
            }
        ),
        required=False
    )

    class Meta:
        model = ConferenceUserModel
        fields = (
            'email',
            'username',
            'name',
            'last_name',
            'date_of_birth',
            'city',
            'country',
            'password1',
            'password2'
        )

    @transaction.atomic
    def save(self):
        # first, create a user
        user = super().save(commit=False)
        user.is_researcher = True
        user.save()
        researcher = ResearcherModel.objects.create(
            user=user,
            last_name=self.cleaned_data.get('last_name'),
            date_of_birth=self.cleaned_data.get('date_of_birth'),
        )
        return user
