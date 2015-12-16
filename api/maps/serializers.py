from rest_framework import serializers
from .models import Map, MapFeature



class MapSerializer(serializers.ModelSerializer):
    class Meta:
        model = Map
        fields = '__all__'



class MapFeatureSerializer(serializers.ModelSerializer):
    class Meta:
        model = MapFeature
