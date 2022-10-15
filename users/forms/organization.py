from users.forms import ConferenceUserSignupForm
from users.models import OrganizationModel, ConferenceUserModel


class OrganizationSignupForm(ConferenceUserSignupForm):
    # TODO 14: change html from 'name' to 'Company name',
    class Meta(ConferenceUserSignupForm):
        model = ConferenceUserModel
        fields = ('username', 'name', 'password1', 'password2')

    def save(self, commit=True):
        user = super().save(commit=False)
        user.is_organization = True
        user.save()
        organization = OrganizationModel.objects.create(user=user)
        organization.save()
        return user
