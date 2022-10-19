from django.urls import path
from ch import views

app_name = 'ch'

urlpatterns = [
    path('', views.IndexView.as_view(), name='home-page'),
    path('about', views.AboutView.as_view(), name='about-page'),
    path('popular_conferences', views.PopularConferencesView.as_view(), name='popular_conferences-page'),
    path('conf', views.SearchConferencesView.as_view(), name='conf_search'),
    path('conf/create', views.CreateConferenceView.as_view(), name='conf_create'),
    path('conf/<int:pk>/', views.ConfInfoView.as_view(), name='conf_detail'),
    path('conf/<int:pk>/event/create', views.CreateEventView.as_view(), name='event_create'),
    path('conf/<int:fk>/event/<int:pk>', views.EventInfoView.as_view(), name='event_detail'),
    path('users_and_organizations', views.UsersAndOrganizations.as_view(), name='users_and_organizations-page')
]
