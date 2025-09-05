from django.db import models
from django.contrib.auth import get_user_model
from courses.models import Course

User = get_user_model()

class UserProgress(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='progress')
    total_study_time = models.IntegerField(default=30)  # minutes
    lessons_completed = models.IntegerField(default=1)
    quizzes_completed = models.IntegerField(default=2)
    flashcards_reviewed = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

class DailyActivity(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    date = models.DateField()
    study_time_minutes = models.IntegerField(default=30)
    lessons_completed = models.IntegerField(default=1)
    xp_earned = models.IntegerField(default=45)
    
    class Meta:
        unique_together = ['user', 'date']
        ordering = ['-date']
