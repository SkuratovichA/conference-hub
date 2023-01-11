# author: Shchapaniak Andrei
# author: Khrystsiuk Dziyana

from django.urls import path
from conferences import views

from rest_framework import routers

app_name = 'conferences'

urlpatterns = [
    path('', views.ConferencesListView.as_view(), name='conferences-page'),
    path('api/get_conf/<slug:slug>', views.ConferenceGetOneAPI.as_view(), name='api_get-one-conf'),
    path('api/get_all_confs', views.ConferenceGetAllAPI.as_view(), name='api_get-all-confs'),
    path('api/manipulate_conf/<slug:slug>', views.ConferenceOrganizationManipulateAPI.as_view(), name='api_manipulate-conf'),
    path('api/get_events/<slug:slug>', views.ConferenceGetEventsAPI.as_view(), name='api_get_events-conf'),
    path('api/create_event/<slug:slug>', views.ConferenceCreateEventAPI.as_view(), name='api_create_event-conf'),
    path('api/delete_event/<slug:slug>', views.ConferenceDeleteEventAPI.as_view(), name='api_delete_event-conf'),
    path('api/update_event/<slug:slug>', views.ConferenceUpdateEventAPI.as_view(), name='api_update_event-conf'),

    path('<slug:username>/display', views.DisplayConferenceView.as_view(), name='conf_display-page'),
    path('<slug:username>/my_lectures', views.UserEventsView.as_view(), name='user_lectures-page'),
    path('<slug:username>/create', views.CreateConferenceView.as_view(), name='conf_create-page'),
    path('<slug:username>/edit/<slug:slug>', views.EditConferenceView.as_view(), name='conf_edit-page'),
    path('delete/<slug:slug>', views.DeleteConferenceView.as_view(), name='conf_delete-page'),
    path('<slug:slug>', views.ConferenceInfoView.as_view(), name='conf_detail-page'),
    path('<slug:slug>/event/<slug:username>/create', views.CreateEventView.as_view(), name='event_create-page'),
    path('<slug:slug>/event/<slug:username>/edit/<int:pk>', views.EditEventView.as_view(), name='event_edit-page'),
    path('<slug:slug>/event/<slug:username>/delete/<int:pk>', views.DeleteEventView.as_view(), name='event_delete-page'),
    path('<slug:slug>/event/<int:pk>', views.EventInfoView.as_view(), name='event_detail-page'),
]
