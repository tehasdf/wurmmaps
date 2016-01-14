from rest_framework import serializers
from .models import Map, MapFeature



class MapSerializer(serializers.ModelSerializer):
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
        fields = ['feature_type', 'data', 'map']

    map = serializers.CharField(max_length=32)


    def validate_map(self, value):
        map_obj = Map.objects.by_edit_view_id(value).get()
        if map_obj.edit_id == value:
            return map_obj
        raise serializers.ValidationError('Incorrect map id')
