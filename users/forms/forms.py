from users.models.conferenceuser import ConferenceUser
from users.models.profile import Profile
from django import forms


# TODO 8: add different forms for different types of users (move them to appropriate files)
class UserUpdateForm(forms.ModelForm):
    email = forms.EmailField()

    class Meta:
        model = ConferenceUser
        fields = ('name', 'email')


class ProfileUpdateForm(forms.ModelForm):
    class Meta:
        model = Profile
        fields = ('image',)
