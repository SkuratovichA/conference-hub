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

        invite = conf_models.InviteModel.objects.filter(
                            Q(user__username=username) & Q(lecture__event__name=lect_name))

        if action == "accept_invite":
            invite.model.approved = 1
        elif action == "decline_invite":
            #invite.delete()
            print("b")

        return render(request, '../templates/ch/index.html')


class AboutView(generic.TemplateView):
    template_name = 'ch/index.html'
