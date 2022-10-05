from django.urls import path
from . import views

app_name ='ch'

urlpatterns = [
    path('', views.IndexView.as_view(), name='home-page'),
    path('about', views.AboutView.as_view(), name='about-page'),
    path('login', views.LoginView.as_view(), name='login-page'),
    path('signup', views.SignupView.as_view(), name='signup-page'),
]
