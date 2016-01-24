from django.conf.urls import url, include
from django.contrib import admin
from django.contrib.staticfiles.views import serve

from rest_framework_nested.routers import SimpleRouter, NestedSimpleRouter

from maps.views import MapViewSet, MapFeaturesViewSet

router = SimpleRouter()
router.register('maps', MapViewSet, 'maps')
router.register('features', MapFeaturesViewSet, 'features')



urlpatterns = [
    url(r'^api/', include(router.urls)),
    url(r'^admin/', admin.site.urls),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    url(r'^static/(?P<path>.*)$', serve)
]
