"""
    A file containing classes/functions which could make the application more consistent.
    Inspired by .yaml parameters and similar stuff.

    TODO: add constants for database fields.
"""


class MessageWrapper:
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
