# author: Shchapaniak Andrei

import decimal

from django.views import generic
import ch.models as ch_models
import users.models as user_models
import conferences.models as conf_models
from django.db.models import Q
from django.shortcuts import render
import json
from django.http import JsonResponse, HttpResponseBadRequest

from django.contrib.auth.mixins import PermissionRequiredMixin, LoginRequiredMixin
import ch.serializers as sers
from rest_framework import viewsets, generics
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import FileUploadParser
from rest_framework import status


import logging


logger = logging.getLogger(__name__)

class PurchaseManipulateBucket(APIView):
    queryset = ch_models.PurchasesModel
    serializer_class = sers.PurchaseSerializerSlug
    lookup_field = 'slug'
    permission_classes = (IsAuthenticated,)

    def post(self, request, *args, **kwargs):
        conf = conf_models.ConferenceModel.objects.get(slug=kwargs['slug'])
        user = user_models.ConferenceUserModel.objects.get(username=request.user.username)
        state = ch_models.PurchasesModel(researcher=user.researcher, conference=conf, status=False)
        state.save()

        return Response({'action': 'add'}, status=status.HTTP_200_OK)

    def delete(self, request, *args, **kwargs):
        conf = conf_models.ConferenceModel.objects.get(slug=kwargs['slug'])
        user = user_models.ConferenceUserModel.objects.get(username=request.user.username)
        state = ch_models.PurchasesModel.objects.filter(Q(conference__name=conf.name) &
                                         Q(researcher__user__username=user.username))

        if len(state) > 0:
            state[0].delete()

        return Response({'action': 'delete'}, status=status.HTTP_200_OK)

class PurchaseGetState(APIView):
    queryset = ch_models.PurchasesModel
    serializer_class = sers.PurchaseSerializerSlug
    lookup_field = 'slug'
    permission_classes = (IsAuthenticated,)

    def post(self, request, *args, **kwargs):
        res = {}
        conf = conf_models.ConferenceModel.objects.get(slug=kwargs['slug'])
        user = user_models.ConferenceUserModel.objects.get(username=request.user.username)
        state = ch_models.PurchasesModel.objects.filter(Q(conference__name=conf.name) &
                                         Q(researcher__user__username=user.username))

        print(request.user.username)
        if len(state) > 0:
            print('TTTTTTTTTT')
            res = sers.PurchaseSerializer(state[0]).data

        return Response(res, status=status.HTTP_200_OK)


class PurchaseGetStateConfsUser(APIView):
    queryset = ch_models.PurchasesModel
    serializer_class = sers.PurchaseSerializer

    def get(self, request, *args, **kwargs):
        researcher = user_models.ResearcherModel.objects.filter(user__username=request.user.username)
        bucket_objects = ch_models.PurchasesModel.objects.all()

        content = {'in_bucket': []}
        for obj in bucket_objects:
            if obj.status == False:
                content['in_bucket'].append(sers.PurchaseSerializer(obj).data)

        return Response(content, status=status.HTTP_200_OK)


class PurchasesView(generic.ListView):
    template_name = 'users/purchase.html'
    model = ch_models.PurchasesModel
    slug_field = 'slug'

    def get_context(self, request):
        purchases = ch_models.PurchasesModel.objects.filter(
            Q(researcher__user=request.user) & Q(status=False))

        purs_id = [el.conference.id for el in purchases]
        finish_price = 0
        for el in purchases:
            finish_price += el.conference.price

        return {'purchases': purchases, 'purs_conf_id': purs_id, 'sum': finish_price}

    def get(self, request, *args, **kwargs):
        context = self.get_context(request)
        return render(request, self.template_name, context)

    def post(self, request, *args,  **kwargs):
        data = json.load(request)
        if data['action'] == "buy":
            dict_res = self.buy_confs(data['confs'], request.user)
        elif data['action'] == "delete":
            dict_res = self.rm_from_buket(data['confid'], request.user)

        return JsonResponse(dict_res)

    @staticmethod
    def rm_from_buket(confid, user):
        ch_models.PurchasesModel.objects.get(
            Q(conference__id=confid) & Q(researcher__user=user)).delete()

        return {'valid': 'true'}

    @staticmethod
    def buy_confs(arr_confs, user):
        finish_price = 0
        for conf_id in arr_confs:
            finish_price += conf_models.ConferenceModel.objects.get(id=conf_id).price.amount

        if finish_price > user.balance.amount:
            return {'valid': 'false'}

        for conf_id in arr_confs:
            conference = conf_models.ConferenceModel.objects.get(id=conf_id)
            organization_model = conference.organization.user
            price_conf = conference.price.amount
            user_model = user_models.ResearcherModel.objects.get(user=user).user

            conference.visitors.add(user_model)
            conference.save()

            user_model.balance.amount -= decimal.Decimal(price_conf)
            organization_model.balance.amount += decimal.Decimal(price_conf)

            pur = ch_models.PurchasesModel.objects.get(
                Q(researcher__user=user) & Q(conference__id=conf_id))
            pur.status = True

            pur.save()
            user_model.save()
            organization_model.save()

        return {'valid': 'true'}
