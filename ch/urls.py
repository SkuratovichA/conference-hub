from django.urls import path
from ch import views

app_name = 'ch'

urlpatterns = [
    path('', views.IndexView.as_view(), name='home-page'),
    path('about', views.AboutView.as_view(), name='about-page'),
    path('popular_conferences', views.PopularConferencesView.as_view(), name='popular_conferences-page'),
    path('search', views.SearchConferencesView.as_view(), name='conf_search'),
    path('search/<int:pk>/', views.ConfInfoView.as_view(), name='conf_detail'),
    path('users_and_organizations', views.UsersAndOrganizations.as_view(), name='users_and_organizations-page')
]
