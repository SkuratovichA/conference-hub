from users.models import ProfileModel
from django import forms


# TODO 8: add different forms for different types of users (move them to appropriate files)

class ProfileUpdateForm(forms.ModelForm):

    class Meta:
        model = ProfileModel
        fields = ('image', )
