from django.test import TestCase
from django.core.urlresolvers import reverse

from maps.models import Map
from maps.views import MapViewSet


class TestMapViewSet(TestCase):
    def setUp(self):
        self.obj = Map(name='the map', edit_id='edit id', view_id='view id')
        self.obj.save()

    def test_get_by_edit_id(self):
        response = self.client.get(reverse('maps-detail', kwargs={'id': self.obj.edit_id}))
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['name'], 'the map')

    def test_get_by_view_id(self):
        response = self.client.get(reverse('maps-detail', kwargs={'id': self.obj.view_id}))
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['name'], 'the map')
