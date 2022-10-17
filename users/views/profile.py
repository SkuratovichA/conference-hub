from users.forms import ConferenceUserUpdateForm, ResearcherUpdateForm, OrganizationUpdateForm
from django.contrib.messages.views import SuccessMessageMixin
from conference_hub.utils.message_wrapper import MessageMixin
from django.contrib.auth.mixins import LoginRequiredMixin
from django.contrib.auth.views import PasswordChangeView
from django.views.generic import TemplateView
from users.forms import ProfileUpdateForm
from django.urls import reverse_lazy
from django.shortcuts import render


class ProfileView(LoginRequiredMixin, TemplateView):
    login_url = '/login'
    template_name = 'users/profile.html'
    redirect_field_name = ''  # TODO 18
    permission_denied_message = MessageMixin.messages.USERS.fail.permissions


class ProfileUpdateView(TemplateView, SuccessMessageMixin, LoginRequiredMixin):
    template_name = "users/profile_update.html"
    success_url = reverse_lazy('users:profile_update-page')
    login_url = '/login'
    permission_denied_message = MessageMixin.messages.USERS.fail.permissions
    redirect_field_name = reverse_lazy('users:profile-page')  # return to user profile page

    def get(self, request, *args, **kwargs):
        context = {
            'u_form': ConferenceUserUpdateForm(instance=request.user),  # edit forms & add current information
            'p_form': ProfileUpdateForm(instance=request.user.profile)
        }
        if request.user.is_researcher:
            context['r_form'] = ResearcherUpdateForm(instance=request.user.researcher)
        elif request.user.is_organization:
            context['o_form'] = OrganizationUpdateForm(instance=request.user.organization)
        else:
            pass  # admin ?
        return render(request, 'users/profile_update.html', context)

    def post(self, request):
        context = {
            'u_form': ConferenceUserUpdateForm(
                request.POST,
                instance=request.user
            ),
            'p_form': ProfileUpdateForm(
                request.POST,
                request.FILES,
                instance=request.user.profile
            ),
            'ro_form': (
                ResearcherUpdateForm(request.POST, instance=request.user.researcher)
                if request.user.is_researcher else
                OrganizationUpdateForm(request.POST, instance=request.user.organization)
            )
        }
        if any(not f.is_valid() for f in context.values()):
            return
        map(lambda x: x.save(), context.values())  # could be a cycle
        self.success_message = MessageMixin.messages.USERS.success.update_profile
        return super(TemplateView, self).render_to_response(context)


class ProfileChangePasswordView(SuccessMessageMixin, PasswordChangeView):
    template_name = 'users/profile_password_change.html'
    success_message = MessageMixin.messages.USERS.success.change_password
    success_url = reverse_lazy('users:profile-page')
