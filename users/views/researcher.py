from conference_hub.utils.message_wrapper import MessageMixin
from django.views.generic.edit import CreateView
from users.models import ConferenceUserModel, OrganizationEmployeeModel
from users.forms import ResearcherSignupForm
from django.shortcuts import redirect
from django.contrib.auth import login
from django.contrib import messages
from django.views import generic
from django.http import Http404
import logging

logger = logging.getLogger(__name__)


class ResearcherSignupView(CreateView):
    model = ConferenceUserModel
    form_class = ResearcherSignupForm
    template_name = 'users/signup_form.html'

    def get_context_data(self, **kwargs):
        kwargs['user_type'] = 'researcher'
        return super().get_context_data(**kwargs)

    # TODO 20: remove these functions and add MessagesMixin
    def form_valid(self, form):
        user = form.save()
        login(self.request, user)
        messages.success(self.request, MessageMixin.messages.USERS.success.signup)
        return redirect(user.get_absolute_url())

    def form_invalid(self, form):
        messages.error(self.request, MessageMixin.messages.USERS.fail.signup)
        return super().form_invalid(form)


class OrganizationsView(generic.ListView):
    template_name = 'users/organizations_employees.html'

    def get(self, request, *args, **kwargs):
        url = self.request.get_full_path()
        logger.debug(f'url: {url}')
        self.username = url.split('/')[-2]
        logger.debug(f'org username: {self.username}')
        self.researcher = ConferenceUserModel.objects.get(username=self.username)
        if not self.researcher.is_researcher:
            raise Http404("Provided user is not a researcher")
        logger.debug(f'organization: {self.researcher}')
        return super().get(request, *args, **kwargs)

    def get_queryset(self):
        orgs = OrganizationEmployeeModel.objects.filter(
            researcher__user=self.researcher, approved=True, rejected=False
        )
        return orgs

    def get_context_data(self, *, object_list=None, **kwargs):
        context = super().get_context_data(object_list=object_list, **kwargs)
        context['url_user'] = self.researcher
        return context

