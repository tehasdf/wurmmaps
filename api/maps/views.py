from django.db.models import Q
from django.http import Http404

from rest_framework import viewsets
from rest_framework.generics import get_object_or_404
from rest_framework.permissions import BasePermission, SAFE_METHODS

from maps.models import Map
from maps.serializers import MapSerializer


class OnlyEditByEditID(BasePermission):
    def has_object_permission(self, request, view, obj):
        used_id = view.kwargs['id']
        if request.method not in SAFE_METHODS and obj.edit_id != used_id:
            return False
        return True


class MapViewSet(viewsets.ModelViewSet):
    lookup_field = 'id'

    queryset = Map.objects.all()
    serializer_class = MapSerializer
    permission_classes = [OnlyEditByEditID]

    def get_object(self):
        """Try getting the object by both edit_id and view_id
        """
        queryset = self.filter_queryset(self.get_queryset())

        lookup_url_kwarg = self.lookup_url_kwarg or self.lookup_field

        assert lookup_url_kwarg in self.kwargs, (
            'Expected view %s to be called with a URL keyword argument '
            'named "%s". Fix your URL conf, or set the `.lookup_field` '
            'attribute on the view correctly.' %
            (self.__class__.__name__, lookup_url_kwarg)
        )

        lookup = self.kwargs[lookup_url_kwarg]
        try:
            obj = Map.objects.filter(Q(edit_id=lookup) | Q(view_id=lookup)).get()
        except Map.DoesNotExist:
            raise Http404

        self.check_object_permissions(self.request, obj)

        return obj
