from django.shortcuts import render
from django.views import generic
from conferences import models as conferences_models
from users import models as users_models
from django.db.models import Q
import ch.models.bucket as ch_models
import logging
from django.http import JsonResponse, HttpResponseBadRequest
import json

logger = logging.getLogger(__name__)


# FIXME: change from ListView to another view to get rid of object_list
class SearchView(generic.ListView):
    # model = users_models.ConferenceUserModel
    template_name = 'ch/search/search.html'
    paginate_by = 50
    object_list = users_models.ConferenceUserModel.objects.all()

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        return context

    def get(self, request, *args, **kwargs):

        def get_users(it):
            return list(map(lambda el: el.user, it))

        type = request.GET.get('type', default='researchers')
        param = request.GET.get('q', default='')  # filter parameter, e.g name pattern

        # create Query prompts
        conferenceuser_Q = Q(
            Q(user__username__contains=param) |
            Q(user__name__contains=param) |
            Q(user__email__contains=param)
        )
        researcher_Q = Q(last_name__contains=param)
        conference_Q = Q(name__contains=param)

        # get objects
        object_lists = {
            'researchers':
                get_users(users_models.ResearcherModel.objects.filter(
                    Q(conferenceuser_Q | researcher_Q)
                )),
            'organizations':
                get_users(users_models.OrganizationModel.objects.filter(
                    conferenceuser_Q
                )),
            'conferences':
                conferences_models.ConferenceModel.objects.filter(
                    conference_Q
                )
        }

        purs_confs_name_ok = []
        purs_confs_name_not_ok = []
        confs_name = []

        if request.user.is_researcher == True:
            models_id = conferences_models.ConferenceModel.objects.filter(conference_Q)
            confs_name = [el.name for el in models_id]

            purchases_ok = ch_models.PurchasesModel.objects.filter(Q(researcher__user=request.user)
                                                    & Q(status=True)
                                                    & Q(conference__name__in=confs_name))
            purs_confs_name_ok = [el.conference.name for el in purchases_ok]

            purchases_not_ok = ch_models.PurchasesModel.objects.filter(Q(researcher__user=request.user)
                                                    & Q(status=False)
                                                    & Q(conference__name__in=confs_name))
            purs_confs_name_not_ok = [el.conference.name for el in purchases_not_ok]

        context = {
            'object_list': object_lists[type],  # list with researchers/conferences/etc
            **object_lists,
            "type": type,
            'confs_name': confs_name,
            'purs_confs_name_ok': purs_confs_name_ok,
            'purs_confs_name_not_ok': purs_confs_name_not_ok
        }

        return render(request, self.template_name, context)

    def post(self, request, *args,  **kwargs):
        data = json.load(request)
        self.create_pur(data['username'], data['confname'])
        return JsonResponse({})

    @staticmethod
    def create_pur(username, confname):
        obj = ch_models.PurchasesModel
        user = users_models.ResearcherModel.objects.get(user__username=username)
        conf = conferences_models.ConferenceModel.objects.get(name=confname)
        obj.objects.create(researcher=user, conference=conf)