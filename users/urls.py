from django.urls import path
from django.contrib.auth import views as auth_views
from . import views

app_name = 'users'

urlpatterns = [
    path('profile', views.ProfileView.as_view(), name='profile-page'),
    path('login', auth_views.LoginView.as_view(template_name='users/login.html'), name='login-page'),
    path('logout', auth_views.LogoutView.as_view(template_name='users/logout.html'), name='logout-page'),

    path('signup', views.SignupView.as_view(), name='signup-page'),
    path('signup/researcher', views.ResearcherSignupView.as_view(), name='signup_researcher-page'),
    path('signup/organization', views.OrganizationSignupView.as_view(), name='signup_organization-page'),
]
