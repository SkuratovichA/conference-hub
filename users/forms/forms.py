from users.models import ConferenceUserModel, ProfileModel
from django import forms


# TODO 8: add different forms for different types of users (move them to appropriate files)
class UserUpdateForm(forms.ModelForm):
    email = forms.EmailField()

    class Meta:
        model = ConferenceUserModel
        fields = ('name', 'email')


class ProfileUpdateForm(forms.ModelForm):
    class Meta:
        model = ProfileModel
        fields = ('image',)
