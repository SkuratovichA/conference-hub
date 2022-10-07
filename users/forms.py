from django import forms
# from django.contrib.auth.models import User
from .models import User
from django.contrib.auth.forms import UserCreationForm


class UserForm(UserCreationForm):
    email = forms.EmailField(
        widget=forms.TextInput(
            attrs={
                'type': 'email',
                'placeholder': ('Email')
            }
        ),
        max_length=128,
        min_length=1
    )
    first_name = forms.CharField(
        widget=forms.TextInput(
            attrs={
                'type': 'first_name',
                'placeholder': ('First Name')
            }
        ),
        max_length=128,
        min_length=1
    )
    last_name = forms.CharField(
        widget=forms.TextInput(
            attrs={
                'type': 'last_name',
                'placeholder': ('Last Name')
            }
        ),
        max_length=128,
        min_length=1
    )
    password1 = forms.CharField(
        widget=forms.PasswordInput(
            attrs={
                'placeholder': 'Password'
            }
        ),
        max_length=128
    )
    password2 = forms.CharField(
        widget=forms.PasswordInput(
            attrs={
                'placeholder': 'Repeat Password'
            }
        ),
        max_length=128
    )
    date_of_birth = forms.DateField(
        widget=forms.TextInput(
            attrs={
                'type': 'date of birth',
                'class': 'form-control',
            }
        )
    )

    class Meta:
        model = User
        fields = [
            'email',
            'first_name',
            'password1',
            'password2',
            'date_of_birth'
        ]
