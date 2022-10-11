from django.contrib.auth import REDIRECT_FIELD_NAME
from django.contrib.auth.decorators import user_passes_test


# TODO: if parameters can be passed to a decorator, use this
# def usertype_required(function=None, redirect_field_name=REDIRECT_FIELD_NAME, login_url='login-page', user=object, user_type=""):
#     """
#     Decorator for views that checks that the logged in user is a student,
#     redirects to the login page if necessary.
#     """
#     actual_decorator = user_passes_test(
#         lambda u: u.is_active and getattr(user, 'is_' + user_type),
#         login_url=login_url,
#         redirect_field_name=redirect_field_name
#     )
#     if function:
#         return actual_decorator(function)
#     return actual_decorator


def researcher_required(function=None, redirect_field_name=REDIRECT_FIELD_NAME, login_url='login-page'):
    """
    Decorator for views that checks that the logged in user is a student,
    redirects to the login page if necessary.
    """
    actual_decorator = user_passes_test(
        lambda u: u.is_active and u.is_researcher,
        login_url=login_url,
        redirect_field_name=redirect_field_name
    )
    if function:
        return actual_decorator(function)
    return actual_decorator


def organization_required(function=None, redirect_field_name=REDIRECT_FIELD_NAME, login_url='login-page'):
    """
    Decorator for views that checks that the logged in user is a student,
    redirects to the login page if necessary.
    """
    actual_decorator = user_passes_test(
        lambda u: u.is_active and u.is_organization,
        login_url=login_url,
        redirect_field_name=redirect_field_name
    )
    if function:
        return actual_decorator(function)
    return actual_decorator
