from users.models.invitation import InvitationModel
from django.forms import ModelForm
from django import forms


class InvitationCreateForm(ModelForm):
    organization = forms.CharField(
        max_length=128,
        widget=forms.TextInput(attrs={
            'autocomplete': 'username',
            'placeholder': 'Organization name'
        })
    )
    researcher = forms.CharField(
        max_length=128,
        widget=forms.TextInput(attrs={
            'autocomplete': 'researcher',
            'placeholder': 'Researcher name'
        })
    )
    conference = forms.CharField(
        max_length=128,
        widget=forms.TextInput(attrs={
            'autocomplete': 'conference',
            'placeholder': 'Conference Name'
        })
    )

    class Meta:
        model = InvitationModel
        fields = '__all__'
