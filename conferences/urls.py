from django.urls import path
from conferences import views

app_name = 'conferences'

urlpatterns = [
    path('', views.ConferencesListView.as_view(), name='conferences-page'),
    path('<slug:username>/display', views.DisplayConferenceView.as_view(), name='conf_display-page'),
    path('<slug:username>/create', views.CreateConferenceView.as_view(), name='conf_create-page'),
    path('<slug:username>/edit/<slug:slug>', views.EditConferenceView.as_view(), name='conf_edit-page'),
    path('delete/<slug:slug>', views.DeleteConferenceView.as_view(), name='conf_delete-page'),
    path('<slug:slug>', views.ConferenceInfoView.as_view(), name='conf_detail-page'),
    path('<slug:slug>/event/<slug:username>/create', views.CreateEventView.as_view(), name='event_create-page'),
    path('<slug:slug>/event/<slug:username>/edit/<int:pk>', views.EditEventView.as_view(), name='event_edit-page'),
    path('<slug:slug>/event/<slug:username>/delete/<int:pk>', views.DeleteEventView.as_view(), name='event_delete-page'),
    path('<slug:slug>/event/<int:pk>', views.EventInfoView.as_view(), name='event_detail-page'),
]
