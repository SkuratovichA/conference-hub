"""
    A file containing classes/functions which could make the application more consistent.
    Inspired by .yaml parameters and similar stuff.

    TODO: add constants for database fields.
"""


class MessageMixin:
    """ A class with different kinds of messages. """
    class messages:
        """ Must be here to access messages """
        class USERS:
            """ App name """
            login_success = 'Welcome back!'
            login_fail = 'Cannot log in!'
            signup_success = 'Welcome!'
            signup_fail = 'Cannot sign up!'
            logout = 'See you later!'


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
