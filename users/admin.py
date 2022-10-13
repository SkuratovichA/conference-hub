from users.forms import ConferenceUserForm
from users.models import ConferenceUserModel
from django.contrib import admin


@admin.register(ConferenceUserModel)
class ConferenceAdmin(admin.ModelAdmin):
    """
    taken from here: https://stackoverflow.com/questions/58951777/how-do-i-register-a-custom-django-user-model-to-the-admin-page
    """
    add_form = ConferenceUserForm  # TODO 4: use two different forms for add_form and form ???
    form = ConferenceUserForm
    model = ConferenceUserModel
    list_display = ('email', 'name', 'is_staff', 'is_active', )
    list_filter = ('email', 'name', 'is_staff', 'is_active', )
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        ('Permissions', {'fields': ('is_staff', 'is_active')}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide', ),
            'fields': ('email', 'password1', 'password2', 'is_staff', 'is_active')}
         ),
    )
    search_fields = ('email', )
    ordering = ('email', )
