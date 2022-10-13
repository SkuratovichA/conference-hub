from users.forms import ConferenceUserForm
from users.models import OrganizationModel


class OrganizationForm(ConferenceUserForm):

    def save(self, commit=True):
        user = super().save(commit=False)
        user.is_organization = True
        user.save()
        organization = OrganizationModel.objects.create(user=user)
        organization.save()
        return user

