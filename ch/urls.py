from django.urls import path

import ch.views as views

app_name = 'ch'

urlpatterns = [
    path('', views.IndexView.as_view(), name='home-page'),
    path('about', views.AboutView.as_view(), name='about-page'),
]
