from django.urls import path
from django.contrib.auth import views as auth_views
from . import views

app_name = 'users'

urlpatterns = [
    path('home', auth_views.LogoutView.as_view(template_name='users/logout.html'), name='home-page'), # TODO: create a hompage

    path('login', auth_views.LoginView.as_view(template_name='users/login.html'), name='login-page'),
    path('logout', auth_views.LogoutView.as_view(template_name='users/logout.html'), name='logout-page'),
    path('signup', views.SignupView.as_view(), name='signup-page'),
]
