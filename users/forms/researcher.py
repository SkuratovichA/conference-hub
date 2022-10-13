from users.forms.conferenceuser import ConferenceUserForm
from django.utils.translation import gettext_lazy as _
from users.models.conferenceuser import ConferenceUser
from users.models.researcher import Researcher
from django.db import transaction
from django import forms


class ResearcherForm(ConferenceUserForm):
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
        model = ConferenceUser
        fields = ('email', 'name', 'last_name', 'date_of_birth', 'password1', 'password2')

    @transaction.atomic
    # TODO 6: remove kostyli ebanye
    def save(self):
        # first, create a user
        user = super().save(commit=False)
        user.is_researcher = True
        user.save()
        researcher = Researcher.objects.create(
            user=user,
            last_name=self.cleaned_data.get('last_name'),
            date_of_birth=self.cleaned_data.get('date_of_birth')
        )
        return user
