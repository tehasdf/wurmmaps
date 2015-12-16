from rest_framework import viewsets

from maps.models import Map
from maps.serializers import MapSerializer


class MapViewSet(viewsets.ModelViewSet):
    queryset = Map.objects.all()
    serializer_class = MapSerializer
    permission_classes = []
