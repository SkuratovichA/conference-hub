from django.views import generic
from conferences import models
from users import models
import logging


logger = logging.getLogger(__name__)


class SearchView(generic.ListView):
    model = models.ConferenceUserModel
    template_name = 'ch/search.html'
    paginate_by = 50
    object_list = models.ConferenceUserModel.objects.all()

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        return context

    # TODO: select a model by a querry
    def post(self, request, *args, **kwargs):
        logger.debug(args)
        logger.debug(kwargs)
        logger.debug(request)
        context = {'object_list': models.ConferenceUserModel.objects.all()}
        return super().render_to_response(context)
