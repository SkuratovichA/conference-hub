from django.views import generic
from django.shortcuts import render
import conferences.models as conf_models
from django.db.models import Q


class IndexView(generic.TemplateView):
    template_name = 'ch/index.html'

    def get(self, request, *args, **kwargs):
        action = request.GET.get('action')
        lect_name = request.GET.get('lecture_name')
        username = request.GET.get('username')

        print(username)
        print(lect_name)
        if username is not None and lect_name is not None:
            invite = conf_models.InviteModel.objects.get(
                            Q(user__username=username) & Q(lecture__event__name=lect_name))

        if action == "accept_invite":
            print("accept")
            invite.approved = True
            invite.save()
        elif action == "decline_invite":
            invite.delete()

        return render(request, '../templates/ch/index.html')

