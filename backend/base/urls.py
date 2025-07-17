
from django.urls import path;
from .views import get_notes, CustomTokenObtainPairView, CustomRefreshTokenView, logout, is_authenticated, register, get_user_info, edit_user_profile

urlpatterns = [
    path('token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', CustomRefreshTokenView.as_view(), name='token_refresh'),
    path('notes/', get_notes),
    path('logout/', logout),
    path('authenticated/', is_authenticated),
    path('register/', register),
    path('user/info/', get_user_info, name='user_info'),
    path('user/edit/', edit_user_profile, name='edit_user_profile'),
]