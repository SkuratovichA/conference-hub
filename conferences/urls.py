from django.urls import path
from conferences.views import views

app_name = 'conferences'

urlpatterns = [
    path('', views.SearchConferencesView.as_view(), name='conf_search'),
    path('create', views.CreateConferenceView.as_view(), name='conf_create'),
    path('<int:pk>/', views.ConfInfoView.as_view(), name='conf_detail'),
    path('<int:pk>/event/create', views.CreateEventView.as_view(), name='event_create'),
    path('<int:fk>/event/<int:pk>', views.EventInfoView.as_view(), name='event_detail'),
]
