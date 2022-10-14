from users.models import ConferenceUserModel, ProfileModel
from django import forms


# TODO 8: add different forms for different types of users (move them to appropriate files)

class EditUserProfileForm(forms.ModelForm):
    email = forms.EmailField(widget=forms.EmailInput(attrs={'class': 'form-control',
                                                            'placeholder': 'Enter your email'}))

    name = forms.CharField(widget=forms.TextInput(attrs={'class': 'form-control',
                                                            'placeholder': 'Enter your name'}))

    username = forms.CharField(widget=forms.TextInput(attrs={'class': 'form-control',
                                                            'placeholder': 'Enter your username'}))

    class Meta:
        model = ConferenceUserModel
        fields = ['email', 'username', 'name']
