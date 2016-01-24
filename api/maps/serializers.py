import uuid

from rest_framework import serializers
from .models import Map, MapFeature


class MapFeatureSerializer(serializers.ModelSerializer):
    class Meta:
        model = MapFeature
        fields = ['id', 'feature_type', 'data', 'map']

    map = serializers.CharField(write_only=True)


    def validate_map(self, value):
        """Only allow adding features to a map with the edit id"""
        map_obj = Map.objects.by_edit_view_id(value).get()
        if map_obj.edit_id == value:
            return map_obj
        raise serializers.ValidationError('Incorrect map id')


class MapSerializer(serializers.ModelSerializer):
    """Simplest/shortened map serializer, used for the list view.
    """
    class Meta:
        model = Map
        exclude = ['id', 'edit_id', 'view_id', 'owner']

    id = serializers.SerializerMethodField()

    def get_id(self, obj):
        # users aren't used yet, maybe in the future
        user = self.context['request'].user
        if user == obj.owner or user.is_superuser:
            return obj.edit_id
        else:
            return obj.view_id

    def create(self, validated_data):
        if not 'edit_id' in validated_data:
            validated_data['edit_id'] = uuid.uuid4().hex

        if not 'view_id' in validated_data:
            validated_data['view_id'] = uuid.uuid4().hex

        return super(MapSerializer, self).create(validated_data)


class MapViewSerializer(MapSerializer):
    """MapSerializer with the features embedded"""

    features = MapFeatureSerializer(many=True, read_only=True)
    edit = serializers.SerializerMethodField()

    def get_edit(self, obj):
        return False

    def get_id(self, obj):
        return obj.view_id


class MapEditSerializer(MapViewSerializer):
    """MapSerializer used for details/edit views, with all the editable fields.

    This should only be accessible by the "secret" map edit url (since it contains
    sensitive data, ie. the map edit url)
    """

    class Meta:
        model = Map
        exclude = ['id']

    edit_id = serializers.ReadOnlyField()
    view_id = serializers.ReadOnlyField()

    def get_id(self, obj):
        return obj.edit_id

    def get_edit(self, obj):
        return True
