from rest_framework import serializers
from .models import Map, MapFeature



class ShortMapSerializer(serializers.ModelSerializer):
    class Meta:
        model = Map
        exclude = ['id', 'edit_id', 'view_id', 'owner']

    id = serializers.SerializerMethodField()

    def get_id(self, obj):
        user = self.context['request'].user
        if user == obj.owner or user.is_superuser:
            return obj.edit_id
        else:
            return obj.view_id


class MapFeatureSerializer(serializers.ModelSerializer):
    class Meta:
        model = MapFeature
        fields = ['id', 'feature_type', 'data', 'map']

    map = serializers.CharField(write_only=True)


    def validate_map(self, value):
        map_obj = Map.objects.by_edit_view_id(value).get()
        if map_obj.edit_id == value:
            return map_obj
        raise serializers.ValidationError('Incorrect map id')


class MapSerializer(ShortMapSerializer):
    features = MapFeatureSerializer(many=True, read_only=True)
