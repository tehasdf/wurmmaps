# -*- coding: utf-8 -*-
# Generated by Django 1.9 on 2016-01-14 20:34
from __future__ import unicode_literals

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('maps', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='map',
            name='owner',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='mapfeature',
            name='map',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='features', to='maps.Map'),
        ),
    ]
