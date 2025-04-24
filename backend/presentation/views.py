from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from .models import Presentation
from .serializers import PresentationSerializer

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_presentation(request):
    serializer = PresentationSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(owner=request.user)  # 👈 sets the current user as the owner
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Get all presentations of the logged-in user
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def list_presentations(request):
    presentations = Presentation.objects.filter(owner=request.user)
    serializer = PresentationSerializer(presentations, many=True)
    return Response(serializer.data)

# Get, Update or Delete a specific presentation by ID
@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def presentation_detail(request, pid):
    try:
        presentation = Presentation.objects.get(pid=pid, owner=request.user)
    except Presentation.DoesNotExist:
        return Response({'error': 'Presentation not found'}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = PresentationSerializer(presentation)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = PresentationSerializer(presentation, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        presentation.delete()
        return Response({'message': 'Presentation deleted successfully'}, status=status.HTTP_204_NO_CONTENT)