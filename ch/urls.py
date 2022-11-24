from django.urls import path

import ch.views as views

app_name = 'ch'

urlpatterns = [
    path('', views.IndexView.as_view(), name='home-page'),
    path('about', views.AboutView.as_view(), name='about-page'),
    path('search', views.SearchView.as_view(), name='search-page'),

    path('<slug>/bucket', views.PurchasesView.as_view(), name='bucket-page'),
]
