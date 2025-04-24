from django.db import models
from django.contrib.auth.models import User
import uuid
from django.utils import timezone

def default_slide():
    return [
        {
            "slideNo": 1,
            "templateName": "A1",
            "heading": "Heading",
            "subheading": "Sub-Heading",
            "description": "Description"
        }
    ]

class Presentation(models.Model):
    pid = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    pname = models.CharField(max_length=255)
    pdata = models.JSONField(default=default_slide, help_text="Stores all slide data in JSON format")
    theme = models.CharField(max_length=100, default="default")

    owner = models.ForeignKey(User, related_name='presentations', on_delete=models.CASCADE)
    access_allowed_users = models.ManyToManyField(User, related_name='shared_presentations', blank=True)
    req_for_access = models.ManyToManyField(User, related_name='requested_presentations', blank=True)

    is_public = models.BooleanField(default=False)
    can_download = models.BooleanField(default=True)

    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.pname
