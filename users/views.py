from django.views import generic


# from .models import ClassName1, ClassName2 # to connect frontend with models


class LoginView(generic.TemplateView):
    template_name = 'users/login.html'
    pass


class SignupView(generic.TemplateView):
    template_name = 'users/signup.html'
    pass


