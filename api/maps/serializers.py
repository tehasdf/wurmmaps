from rest_framework import serializers
from .models import Map, MapFeature



class MapSerializer(serializers.ModelSerializer):
    class Meta:
        model = Map
        fields = '__all__'



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
