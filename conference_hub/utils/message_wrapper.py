"""
    A file containing classes/functions which could make the application more consistent.
    Inspired by .yaml parameters and similar stuff.

"""


# TODO 20:
class MessageMixin:
    # def form_valid(); ... see SuccessMessageMixin
    # def form_invalid(): ...
    """ A class with different kinds of messages. """
    class messages:
        """ Must be here to access messages """
        class USERS:
            class success:
                login = 'Welcome back!'
                signup = 'Welcome!'
                logout = 'See you later!'
                update_profile = 'Profile has been updated'
                change_password = "Password has been changed"

            class fail:
                login = 'Cannot log in!'
                signup = 'Cannot sign up!'
                update_profile = 'Cannot Update profile'
                permissions = 'You must sign in first'


# TODO 21: make subclasses as in MessageMixin
class ConstraintsMixin:
    """ A class with constraints for database fields """
    email_len = 128
    first_name_len = 64
    last_name_len = 64
    country_len = 128
    city_len = 64
    address_len = 128
    password_len = 128
    street_len = 128
