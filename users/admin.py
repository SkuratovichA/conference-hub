from django.contrib import admin
from .models import Profile, User


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    """
    taken from here: https://stackoverflow.com/questions/58951777/how-do-i-register-a-custom-django-user-model-to-the-admin-page
    """
    pass


admin.site.register(Profile)
