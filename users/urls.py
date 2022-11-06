from django.contrib.auth import views as auth_views
from django.urls import path
from users import views

app_name = 'users'

urlpatterns = [
    path('', views.ConferenceUserListView.as_view(), name='users-models'),
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
