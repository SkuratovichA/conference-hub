from conference_hub.utils.message_wrapper import MessageMixin
from django.contrib.messages.views import SuccessMessageMixin
from django.views.generic.edit import CreateView
from users.forms import OrganizationSignupForm
from users.models import ConferenceUserModel
from django.contrib.auth import login
from django.shortcuts import redirect
from django.contrib import messages


class OrganizationSignupView(SuccessMessageMixin, CreateView):
    model = ConferenceUserModel
    form_class = OrganizationSignupForm
    template_name = 'users/signup_form.html'
    success_message = MessageMixin.messages.USERS.success.signup

    def get_context_data(self, **kwargs):
        kwargs['user_type'] = 'organization'
        return super().get_context_data(**kwargs)

    # TODO 20: remove these functions and add MessagesMixin
    def form_valid(self, form):
        user = form.save()
        login(self.request, user)
        messages.success(self.request, MessageMixin.messages.USERS.success.signup)
        return redirect('users:profile-page')

    def form_invalid(self, form):
        messages.error(self.request, MessageMixin.messages.USERS.fail.signup)
        return super().form_invalid(form)

