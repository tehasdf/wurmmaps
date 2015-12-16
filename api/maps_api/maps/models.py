from __future__ import unicode_literals

from django.db import models




class Map(models.Model):
    name = models.TextField()
    description = models.TextField()


class MapFeature(models.Model):
    FEATURE_TYPES = [
        (1, 'Reveal')
    ]

    feature_type = models.SmallIntegerField(choices=FEATURE_TYPES)
    map = models.ForeignKey(to=Map)
    data = models.BinaryField()
