from users.forms import ConferenceUserSignupForm
from users.models import OrganizationModel


class OrganizationSignupForm(ConferenceUserSignupForm):
    class Meta(ConferenceUserSignupForm):
        fields = ('username', 'name', 'password1', 'password2')

    def save(self, commit=True):
        user = super().save(commit=False)
        user.is_organization = True
        user.save()
        organization = OrganizationModel.objects.create(user=user)
        organization.save()
        return user
