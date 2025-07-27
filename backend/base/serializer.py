from rest_framework import serializers
from .models import Note, MyUser
from django.contrib.auth import get_user_model

class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    class Meta:
        model = MyUser
        fields = ['username', 'email', 'password']
    
    def create(self, validated_data):
        user = MyUser(
            username = validated_data['username'],
            email = validated_data['email']
        )
        user.set_password(validated_data['password'])
        user.save()
        return user

class UserSerializer(serializers.ModelSerializer):
    total_presentations = serializers.SerializerMethodField()
    class Meta:
        model = MyUser
        fields = [
            'id', 'username', 'email', 'first_name', 'last_name',
            'profile_picture', 'total_presentations', 'joined_date'
        ]
        read_only_fields = ['joined_date', 'id']

    def get_total_presentations(self, obj):
        return obj.presentations.count()

class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = ['id', 'description']