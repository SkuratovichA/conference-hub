from django.urls import path

import ch.views as views

app_name = 'ch'

urlpatterns = [
    path('', views.IndexView.as_view(), name='home-page'),
    path('api/get_states', views.PurchaseGetStateConfsUser.as_view(), name='api_get-states'),
    path('search', views.SearchView.as_view(), name='search-page'),

    path('<slug>/bucket', views.PurchasesView.as_view(), name='bucket-page'),
]
