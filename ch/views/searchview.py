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
                []
        }

        context = {
            'object_list': object_lists[type],
            # TODO андрюха, это я оссавил только для того, чтобы можно быссро протессить html. Потом нужно будет это удалить!
            **object_lists,
            "type": type,
        }

        return render(request, self.template_name, context)
