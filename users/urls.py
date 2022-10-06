from django.urls import path
from . import views

app_name = 'users'

urlpatterns = [
    path('login', views.LoginView.as_view(), name='login-page'),
    path('signup', views.LoginView.as_view(), name='signup-page'),
]
