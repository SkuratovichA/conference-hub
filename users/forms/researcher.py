from django.utils.translation import gettext_lazy as _
from users.models import ConferenceUserModel, ResearcherModel
from users.forms import ConferenceUserSignupForm
from django.db import transaction
from django import forms


class ResearcherSignupForm(ConferenceUserSignupForm):
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
        input_formats=[f'%d{s}%m{s}%Y' for s in '. / -'.split()],
        widget=forms.DateInput(
            attrs={
                'type': 'date of birth',
                'class': 'form-control',
            }
        )
    )

    class Meta:
        model = ConferenceUserModel
        fields = ('username', 'email', 'name', 'last_name', 'date_of_birth', 'password1', 'password2')

    @transaction.atomic
    # TODO 6: remove kostyli ebanye
    def save(self):
        # first, create a user
        user = super().save(commit=False)
        user.is_researcher = True
        user.save()
        researcher = ResearcherModel.objects.create(
            user=user,
            last_name=self.cleaned_data.get('last_name'),
            date_of_birth=self.cleaned_data.get('date_of_birth')
        )
        return user
