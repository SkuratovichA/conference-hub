# author: Shchapaniak Andrei

from django.urls import path

import ch.views as views

app_name = 'ch'

urlpatterns = [
    path('', views.IndexView.as_view(), name='home-page'),
    path('api/get_conf_state/<slug:slug>', views.PurchaseGetState.as_view(), name='api_get-conf-state-slug'),
    path('api/get_all_states_bucket', views.PurchaseGetStateConfsUser.as_view(), name='api_get-all-states-bucket'),
    path('api/change_capacity_bucket/<slug:slug>', views.PurchaseManipulateBucket.as_view(), name='api_change-capacity-bucket-slug'),
    path('search', views.SearchView.as_view(), name='search-page'),
    path('<slug>/bucket', views.PurchasesView.as_view(), name='bucket-page'),
]
