from conferences.views import views
from django.urls import path

app_name = 'conferences'

urlpatterns = [
    path('<slug:slug>/display', views.DisplayConferenceView.as_view(), name='conf_display-page'),
    path('<slug:slug>/create', views.CreateConferenceView.as_view(), name='conf_create-page'),
    path('<slug:slug>/edit/<str:pk>', views.EditConferenceView.as_view(), name='conf_edit-page'),
    path('<slug:slug>/delete/<str:pk>', views.DeleteConferenceView.as_view(), name='conf_delete-page'),
    path('<int:pk>/', views.ConfInfoView.as_view(), name='conf_detail-page'),
    path('<int:pk>/event/<slug:slug>/create', views.CreateEventView.as_view(), name='event_create-page'),
    path('<int:fk>/event/<slug:slug>/edit/<int:pk>', views.EditEventView.as_view(), name='event_edit-page'),
    path('<int:fk>/event/<slug:slug>/delete/<int:pk>', views.DeleteEventView.as_view(), name='event_delete-page'),
    path('<int:fk>/event/<int:pk>', views.EventInfoView.as_view(), name='event_detail-page'),
]
