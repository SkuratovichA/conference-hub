# author: Shchapaniak Andrei
# author: Skuratovich Aliaksandr

from django.contrib.auth import views as auth_views
from django.urls import path, include
from users import views

from rest_framework import routers

router = routers.DefaultRouter()
router.register(r'users_list', views.ConferenceUserListAPIView, 'api_users-list')
router.register(r'signup-researcher', views.ResearcherSignupAPIView, 'api_signup-researcher')
router.register(r'signup-organization', views.OrganizationSignupAPIView, 'api_signup-organization')
router.register('', views.ProfileAPIView, 'api_profile')

app_name = 'users'

urlpatterns = [
    # path('', views.ConferenceUserListView.as_view(), name='users-models'),  # move to routers
    path('api/get_users_all', views.ConferenceUserGetUsers.as_view(), name='api_get-users-all'),
    path('api/get_users_researchers', views.ConferenceUserGetResearchers.as_view(), name='api_get-users-researchers'),
    path('api/get_users_organizations', views.ConferenceUserGetOrganizations.as_view(), name='api_get-users-organizations'),
    path('api/manipulate_info_user', views.ConferenceUserGetInfo.as_view(), name='api_get-info-user'),
    path('api/login', views.ConferenceUserSigninAPIView.as_view(), name='api-login-view'),
    path('api/get_invite_context', views.InviteAPIView.as_view(), name='api-invite-view'),
    path('api/', include(router.urls)),  # move to routers

    path('invites', views.InviteView.as_view(), name='invites-page'),
    path('login', views.ConferenceUserSigninView.as_view(), name='login-page'),
    path('logout', auth_views.LogoutView.as_view(template_name='users/logout.html'), name='logout-page'),

    path('signup', views.ConferenceUserSignupView.as_view(), name='signup-page'),

    path('signup/researcher', views.ResearcherSignupView.as_view(), name='signup_researcher-page'),
    path('signup/organization', views.OrganizationSignupView.as_view(), name='signup_organization-page'),

    path('<slug>/edit_profile', views.ProfileUpdateView.as_view(), name='profile_update-page'),
    path('<slug>/password_change', views.ProfileChangePasswordView.as_view(), name='password_change-page'),
    path('<slug>/account_delete', views.AccountDeleteView.as_view(), name='account_delete-page'),

    path('<slug>/organizations', views.OrganizationsView.as_view(), name='organizations-page'),
    path('<slug>/employees', views.EmployeesView.as_view(), name='employees-page'),

    path('<slug>', views.ProfileView.as_view(), name='profile-page'),
]
