from users.models import ProfileModel
from django import forms


# TODO 8: add different forms for different types of users (move them to appropriate files)

class ProfileUpdateForm(forms.ModelForm):
    city = forms.CharField(
        widget=forms.TextInput(attrs={
            'autocomplete': 'city',
            'type': 'city',
        }),
        max_length=128,
        min_length=1
    )
    country = forms.CharField(
        widget=forms.TextInput(attrs={
            'autocomplete': 'country',
            'type': 'country',
        }),
        max_length=128,
        min_length=1
    )

    class Meta:
        model = ProfileModel
        fields = ('image', 'city', 'country')
