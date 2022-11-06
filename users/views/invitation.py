from users.models.conferenceuser import ConferenceUserModel
from users.forms.invitation import InvitationCreateForm
from django.shortcuts import render


def add_invite(request):
    form = InvitationCreateForm

    if request.method == "GET":
        results = []
        for obj in ConferenceUserModel.objects.all():
            pr_json = {'username': 0, 'value': 0, 'name': 0, 'img': 0}
            pr_json['username'] = obj.username
            pr_json['name'] = obj.name
            pr_json['value'] = obj.name
            pr_json['img'] = obj.profile.image.url
            results.append(pr_json)

    return render(request, 'users/invitation.html', {'form': form, 'res': ['aaa', 'bbb', 'ccc'], 'test': 'tttt', 'data': results})

