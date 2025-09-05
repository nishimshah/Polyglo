from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    email = models.EmailField(unique=True)
    native_language = models.CharField(max_length=50, blank=True)
    learning_languages = models.JSONField(default=list, blank=True)
    daily_goal = models.IntegerField(default=15)
    current_streak = models.IntegerField(default=0)
    longest_streak = models.IntegerField(default=0)
    total_xp = models.IntegerField(default=0)
    avatar = models.ImageField(upload_to='avatars/', null=True, blank=True)
    
    # Add these progress tracking fields
    total_study_time = models.IntegerField(default=0)  # in minutes
    lessons_completed_count = models.IntegerField(default=0)
    quizzes_completed_count = models.IntegerField(default=0)
    flashcards_reviewed_count = models.IntegerField(default=0)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    groups = models.ManyToManyField(
        'auth.Group',
        verbose_name='groups',
        blank=True,
        help_text='The groups this user belongs to.',
        related_name='custom_user_set',
        related_query_name='custom_user',
    )
    user_permissions = models.ManyToManyField(
        'auth.Permission',
        verbose_name='user permissions',
        blank=True,
        help_text='Specific permissions for this user.',
        related_name='custom_user_set',
        related_query_name='custom_user',
    )

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    def __str__(self):
        return self.email
