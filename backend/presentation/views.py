from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from .models import Presentation
from .serializers import PresentationSerializer
from .utils import generate_presentation_content  # This will call Gemini API

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


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_presentation_with_AI(request):
    # Step 1: Extract data
    pname = request.data.get('pname')
    number_of_slides = request.data.get('number_of_slides')
    prompt = request.data.get('prompt')

    # Step 2: Validate required fields
    if not all([pname, number_of_slides, prompt]):
        return Response({'error': 'All fields are required.'}, status=status.HTTP_400_BAD_REQUEST)

    # Step 3: Create a basic presentation first
    serializer = PresentationSerializer(data={
        'pname': pname,
        'theme': 'dark'
    })

    if serializer.is_valid():
        presentation = serializer.save(owner=request.user)

        # Step 4: Call Gemini API to get slide data
        try:
            slide_data = generate_presentation_content(prompt, number_of_slides)
        except Exception as e:
            return Response({'error': 'Failed to generate slide content', 'details': str(e)},
                            status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        # Step 5: Update the presentation with generated content
        presentation.pdata = slide_data  
        presentation.theme = "dark"  
        presentation.save()

        # Step 6: Return updated presentation
        updated_serializer = PresentationSerializer(presentation)
        return Response(updated_serializer.data, status=status.HTTP_201_CREATED)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
