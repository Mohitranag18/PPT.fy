from rest_framework import serializers
from .models import Presentation

class PresentationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Presentation
        fields = '__all__'
        read_only_fields = ['pid', 'created_at', 'updated_at', 'owner']
