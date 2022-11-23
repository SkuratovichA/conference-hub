from django.http import JsonResponse, HttpResponseBadRequest
from django.shortcuts import render
from django.views import generic
from conferences import models as conferences_models
from users import models as users_models
from django.db.models import Q
from django.contrib import messages
import json

import logging

logger = logging.getLogger(__name__)


class InviteView(generic.ListView):
    # model = users_models.ConferenceUserModel
    template_name = 'users/invites/invites.html'
    paginate_by = 50

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        return context

    # TODO: add permissions
    def get_researcher_context(self, request):
        type = request.GET.get('type', default='organizations')
        param = request.GET.get('q', default='')  # filter parameter, e.g name pattern

        self_username = request.user.username

        # get objects
        object_lists = {
            'organizations':
                users_models.OrganizationEmployeeModel.objects.filter(
                    researcher__user__username=self_username, approved=False, rejected=False
                ),
            'conferences':  # TODO : add conferences invites
                []
        }

        return {
            **object_lists,
            "type": type,
        }

    def get_organization_context(self, request):
        already_sent_requests = list(map(lambda x: x.researcher, users_models.OrganizationEmployeeModel.objects.filter(
            organization__user=request.user,
            rejected=False,
            approved=False,
            finished=False
        )))
        logger.debug(f'already_sent_requests: {already_sent_requests}')
        results = [{
                'username': obj.user.username,
                'value': obj.user.name + ' ' + obj.last_name,
                'name': obj.user.name + ' ' + obj.last_name,
                'img': obj.user.profile.image.url,
            } for obj in users_models.ResearcherModel.objects.all()
            if obj not in already_sent_requests
        ]
        return {'data': results}

    def get_context(self, request):
        return self.get_researcher_context(request) if request.user.is_researcher else self.get_organization_context(request)

    def get(self, request, *args, **kwargs):
        context = self.get_context(request)
        return render(request, self.template_name, context)

    def post(self, request, *args, **kwargs):
        user = self.request.user

        if user.is_organization:
            users_invite = self.request.POST.getlist('test[]')
            logger.debug(users_invite)
            if not len(users_invite):
                messages.warning(message='Select at least one user to send an invite!', request=request)
            else:
                for username in users_invite:
                    researcher = users_models.ConferenceUserModel.objects.get(username=username).researcher
                    logger.debug(researcher)
                    logger.debug(request.user)
                    organization = users_models.OrganizationModel.objects.get(user=request.user)
                    invite = users_models.OrganizationEmployeeModel(
                        researcher=researcher,
                        organization=organization,
                        rejected=False,
                        approved=False,
                        finished=False
                    )
                    invite.save()
                messages.success(message='invites sent!', request=request)

        context = self.get_context(request)
        return render(request, self.template_name, context)

    def put(self, request, *args, **kwargs):
        return self.modify_invite(request, action='approved')

    def delete(self, request, *args, **kwargs):
        return self.modify_invite(request, action='rejected')

    def modify_invite(self, request, action):
        is_ajax = request.headers.get('X-Requested-With') == 'XMLHttpRequest'
        if action not in ['approved', 'rejected']:
            raise ValueError('action must be one of "approved/rejected"')

        if is_ajax:
            data = json.load(request)
            invite_id = data['invite_id']
            invite = users_models.OrganizationEmployeeModel.objects.get(id=invite_id)
            logger.debug(f'before (approved, rejected): {invite.approved} {invite.rejected}')
            setattr(invite, action, True)
            invite.save()
            logger.debug(f'after (approved, rejected): {invite.approved} {invite.rejected}')
            logger.debug(f'invite {action} and saved')
            return JsonResponse({})
        else:
            return HttpResponseBadRequest('Invalid Request')
