import json
from django.test import TestCase
from django.core.urlresolvers import reverse

from maps.models import Map, MapFeature
from maps.views import MapFeaturesViewSet


class TestMapFeatureRetrieving(TestCase):
    def setUp(self):
        self.obj = Map(name='the map', edit_id='edit id', view_id='view id')
        self.obj.save()
        self.feature = MapFeature(feature_type=MapFeature.TYPE_REVEAL, map=self.obj,
            data='123')
        self.feature.save()


    def test_get_without_map_id(self):
        response = self.client.get(reverse('features-list'))
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 0)

    def test_get_by_edit_id(self):
        response = self.client.get(reverse('features-list'), {'map': self.obj.edit_id})
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['id'], self.feature.id)

    def test_get_by_view_id(self):
        response = self.client.get(reverse('features-list'), {'map': self.obj.view_id})
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['id'], self.feature.id)


class TestAddingMapFeatures(TestCase):
    def setUp(self):
        self.obj = Map(name='the map', edit_id='edit id', view_id='view id')
        self.obj.save()

    def test_add_using_edit_id(self):
        data = {
            'map': self.obj.edit_id,
            'feature_type': MapFeature.TYPE_REVEAL
        }

        response = self.client.post(reverse('features-list'),
            json.dumps(data), content_type='application/json')
        self.assertEqual(response.status_code, 201)
        self.assertEqual(self.obj.features.count(), 1)


    def test_add_using_view_id(self):
        data = {
            'map': self.obj.view_id,
            'feature_type': MapFeature.TYPE_REVEAL
        }

        response = self.client.post(reverse('features-list'),
            json.dumps(data), content_type='application/json')
        self.assertEqual(response.status_code, 400)
        self.assertEqual(self.obj.features.count(), 0)
