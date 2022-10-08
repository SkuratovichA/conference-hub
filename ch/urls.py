from django.urls import path
from . import views

app_name ='ch'

urlpatterns = [
    path('', views.IndexView.as_view(), name='home-page'),
    path('about', views.AboutView.as_view(), name='about-page'),
    path('popular_conferences', views.PopularConferencesView.as_view(), name='popular_conferences-page'),
    path('search_conferences', views.SearchConferencesView.as_view(), name='search_conferences-page'),
    path('users_and_organizations', views.UsersAndOrganizations.as_view(), name='users_and_organizations-page')
]
