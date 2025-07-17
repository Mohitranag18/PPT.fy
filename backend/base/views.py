from django.shortcuts import render
from .models import MyUser
from .models import Note
from .serializer import NoteSerializer, UserRegistrationSerializer, UserSerializer
from django.contrib.auth import get_user_model

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from .utils.supabase_client import supabase
from uuid import uuid4

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

class CustomTokenObtainPairView(TokenObtainPairView):
    def post(self, request, *args, **kwargs):
        try:
            response = super().post(request, *args, **kwargs)
            tokens = response.data

            access_token = tokens['access']
            refresh_token = tokens['refresh']

            res = Response()

            res.data = {'success':True}

            res.set_cookie(
                key="access_token",
                value=access_token,
                httponly=True,
                secure=True,
                samesite='None',
                path='/',
                # partitioned=True
            )

            res.set_cookie(
                key="refresh_token",
                value=refresh_token,
                httponly=True,
                secure=True,
                samesite='None',
                path='/',
                # partitioned=True
            )

            return res

        except:
            return Response({'success':False})

class CustomRefreshTokenView(TokenRefreshView):
    def post(self, request, *args, **kwargs):
        try:
            refresh_token = request.COOKIES.get('refresh_token')

            request.data['refresh'] = refresh_token
            response = super().post(request, *args, **kwargs)

            tokens = response.data
            access_token = tokens['access']

            res = Response()

            res.data = {'refreshed':True}
            
            res.set_cookie(
                key='access_token',
                value=access_token,
                httponly=True,
                secure=True,
                samesite='None',
                path='/',
                # partitioned=True
            )
            
            return res
        except:
            return Response()
        
@api_view(['POST'])
def logout(request):
    try:
        res = Response()
        res.data = {'success':True}
        res.delete_cookie('access_token', path='/', samesite='None')
        res.delete_cookie('refresh_token', path='/', samesite='None')
        return res
    except:
        return Response({'success':False})


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def is_authenticated(request):
    return Response({'authenticated':True})


@api_view(['POST'])
@permission_classes([AllowAny])
def register(request):
    serializer = UserRegistrationSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.error)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_notes(request):
    user = request.user
    notes = Note.objects.filter(owner=user)
    serializer = NoteSerializer(notes, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_info(request):
    user = request.user
    serializer = UserSerializer(user)
    return Response(serializer.data)

@api_view(['PATCH'])
@permission_classes([IsAuthenticated])
def edit_user_profile(request):
    try:
        user = MyUser.objects.get(username=request.user.username)
    except MyUser.DoesNotExist:
        return Response({'error': 'User does not exist'}, status=404)

    data = request.data.copy()  # Make it mutable
    profile_image_file = request.FILES.get('profile_picture')

    if profile_image_file:
        ext = profile_image_file.name.split('.')[-1]
        filename = f'{uuid4()}.{ext}'

        profile_image_file.seek(0)
        upload_response = supabase.storage.from_('profile-images').upload(
            filename,
            profile_image_file.read(),
            {
                "content-type": profile_image_file.content_type
            }
        )

        if not upload_response or not hasattr(upload_response, "path"):
            return Response({"error": "Failed to upload profile image"}, status=500)

        image_url = supabase.storage.from_('profile-images').get_public_url(upload_response.path)
        data['profile_picture'] = image_url

    serializer = UserSerializer(user, data=data, partial=True)

    if serializer.is_valid():
        serializer.save()
        return Response({**serializer.data, "success": True})
    
    return Response({**serializer.errors, "success": False}, status=400)
