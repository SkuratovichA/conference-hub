from conferences.views import views
from django.urls import path

app_name = 'conferences'

urlpatterns = [
    path('create', views.CreateConferenceView.as_view(), name='conf_create-page'),
    path('<int:pk>/', views.ConfInfoView.as_view(), name='conf_detail-page'),
    path('<int:pk>/event/create', views.CreateEventView.as_view(), name='event_create-page'),
    path('<int:fk>/event/<int:pk>', views.EventInfoView.as_view(), name='event_detail-page'),
]
