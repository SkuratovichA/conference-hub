"""
Here, there will be:
1. Not important models, in case of we have a lot of them
1. Only mixins used in other models
"""

from django.utils.translation import gettext_lazy as _
from django.db import models


# TODO: add a constraint, that if street is not null, then street_number must not be null
# TODO: add more fields to this database
# TODO: manage how to create a database for Addresses, and attach an address from the database to the new registered user
class AddressMixin(models.Model):
    country = models.CharField(_('Country'), max_length=128)
    city = models.CharField(_('City'), max_length=64)
    street = models.CharField(_('street'), max_length=128)
    street_number = models.IntegerField(_('street number'))
