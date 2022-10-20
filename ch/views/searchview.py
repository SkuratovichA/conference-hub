from django.shortcuts import render
from django.views import generic
from conferences import models as conferences_models
from users import models as users_models
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
    def post(self, request, *args, **kwargs):
        logger.debug(args)
        logger.debug(kwargs)
        logger.debug(request)
        context = {'object_list': users_models.ConferenceUserModel.objects.all()}
        return super().render_to_response(context)

    def get(self, request, *args, **kwargs):
        _models = {
            'researchers': users_models.ResearcherModel,
            'organization': users_models.OrganizationModel
        }
        type = request.GET.get('type', default='researchers')
        name = request.GET.get('name', default='')

        model = _models['type']
        # TODO create complex filter to filter by more parameters ...
        context = {'object_list': model.objects.all().filter(name=name)}
        return render(request, self.template_name, context)
