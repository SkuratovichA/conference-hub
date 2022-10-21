from django.shortcuts import render
from django.views import generic
from conferences import models as conferences_models
from users import models as users_models
from django.db.models import Q
import logging


logger = logging.getLogger(__name__)


# FIXME: change from ListView to another view to get rid of object_list
class SearchView(generic.ListView):
    # model = users_models.ConferenceUserModel
    template_name = 'ch/search.html'
    paginate_by = 50
    object_list = users_models.ConferenceUserModel.objects.all()

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        return context

    # TODO: select a model by a querry
    # def post(self, request, *args, **kwargs):
    #     searched = request.POST['searched']
    #     context = {'object_list': users_models.ConferenceUserModel.objects.filter(name__contains=searched)}
    #     return super().render_to_response(context)

    def get(self, request, *args, **kwargs):
        type = request.GET.get('type', default='researchers')
        param = request.GET.get('q', default='')

        # TODO create complex filter to filter by more parameters ...
        elements_res = []
        elements_orgs = []

        res_s = users_models.ResearcherModel.objects.filter(last_name__contains=param)
        elements_res += users_models.ConferenceUserModel.objects.filter(Q(Q(username__contains=param) |
                                                                        Q(name__contains=param)) &
                                                                        Q(is_researcher=True))

        if len(res_s) > 0:
            for item in res_s: elements_res.append(item.user)

        elements_orgs = users_models.ConferenceUserModel.objects.filter(Q(Q(username__contains=param) |
                                                                  Q(name__contains=param)) &
                                                                  Q(is_organization=True))

        context = {"object_list_res": [*set(elements_res)], "len_res": len(elements_res),
                   "object_list_orgs": [*set(elements_orgs)], "len_orgs": len(elements_orgs),
                   "type": type, "len_confs": 0}

        return render(request, self.template_name, context)
