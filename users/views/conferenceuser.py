from django.views.generic.base import TemplateView


class ConferenceUserSignupView(TemplateView):
    """
    First page where user chooses, which type he is
    """
    template_name = 'users/signup.html'

