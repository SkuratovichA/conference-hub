from users.forms.conferenceuser import ConferenceUserForm
from users.models.organization import Organization


class OrganizationForm(ConferenceUserForm):

    def save(self, commit=True):
        user = super().save(commit=False)
        user.is_organization = True
        user.save()
        organization = Organization.objects.create(user=user)
        organization.save()
        return user

