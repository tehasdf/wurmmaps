from django.test import TestCase
from django.core.urlresolvers import reverse

from maps.models import Map
from maps.views import MapViewSet

class TestMapViewSet(TestCase):
    def setUp(self):
        obj = Map(name='the map', edit_id='edit id', view_id='view id')

    def test_get_by_edit_id(self):
        response = self.client.get(reverse('maps'))
        print 'asd', response