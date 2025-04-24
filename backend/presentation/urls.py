from django.urls import path
from .views import (
    create_presentation,
    list_presentations,
    presentation_detail,
)

urlpatterns = [
    path('presentations/create/', create_presentation, name='create_presentation'),
    path('presentations/', list_presentations, name='list_presentations'),
    path('presentations/<uuid:pid>/', presentation_detail, name='presentation_detail'),
]
