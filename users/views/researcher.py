from conference_hub.utils.message_wrapper import MessageMixin
from django.contrib.messages.views import SuccessMessageMixin
from django.views.generic.edit import CreateView
from users.models import ConferenceUserModel
from users.forms import ResearcherSignupForm
from django.shortcuts import redirect
from django.contrib.auth import login
from django.urls import reverse_lazy


class ResearcherSignupView(SuccessMessageMixin, CreateView):
    model = ConferenceUserModel
    form_class = ResearcherSignupForm
    template_name = 'users/signup_form.html'
    success_url = reverse_lazy('users:login-page')
    success_message = MessageMixin.messages.USERS.signup_success

    def get_context_data(self, **kwargs):
        kwargs['user_type'] = 'researcher'
        return super().get_context_data(**kwargs)

    def form_valid(self, form):
        user = form.save()
        login(self.request, user)
        return redirect('users:profile-page')
