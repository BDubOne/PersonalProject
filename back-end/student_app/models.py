from django.db import models
from django.contrib.auth.models import AbstractUser
from .validators import validate_student_email 
from django.utils import timezone
from datetime import timedelta


class Student(AbstractUser):
    email = models.EmailField(unique=True, validators=[validate_student_email])
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []
    failed_login_attempts = models.IntegerField(default=0)
    lockout_until = models.DateTimeField(null=True, blank=True)

    def reset_attempts_if_needed(self):
        if self.last_failed_attempt and timezone.now() >= self.last_failed_attempt + timedelta(minutes=30):
            self.failed_login_attempts = 0
            self.last_failed_attempt = None
            self.save()

