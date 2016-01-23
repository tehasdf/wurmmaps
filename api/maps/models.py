from __future__ import unicode_literals
from django.conf import settings
from django.db.models import Q
from django.db import models
from jsonfield import JSONField


class MapQuerySet(models.QuerySet):
    def by_edit_view_id(self, map_id):
        return self.filter(Q(edit_id=map_id) | Q(view_id=map_id))


class Map(models.Model):
    objects = models.Manager.from_queryset(MapQuerySet)()

    edit_id = models.TextField(max_length=32)
    view_id = models.TextField(max_length=32)

    name = models.TextField()
    description = models.TextField(blank=True)

    owner = models.ForeignKey(settings.AUTH_USER_MODEL, null=True)


class MapFeature(models.Model):
    FEATURE_TYPES = [
        (1, 'Reveal')
    ]
    TYPE_REVEAL, = [id for id, name in FEATURE_TYPES]

    feature_type = models.SmallIntegerField(choices=FEATURE_TYPES)
    map = models.ForeignKey(to=Map, related_name='features')
    data = JSONField()
