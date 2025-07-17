from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils import timezone

class MyUser(AbstractUser):
    email = models.EmailField(unique=True)
    profile_picture = models.URLField(blank=True, null=True)
    total_presentations = models.PositiveIntegerField(default=0)
    joined_date = models.DateTimeField(default=timezone.now)

class Note(models.Model):
    description = models.CharField(max_length=300)
    owner = models.ForeignKey(MyUser, on_delete=models.CASCADE, related_name='note')

