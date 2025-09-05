from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class Notification(models.Model):
    NOTIFICATION_TYPES = [
        ('reminder', 'Daily Reminder'),
        ('achievement', 'Achievement'),
        ('challenge', 'Challenge'),
        ('streak', 'Streak Alert'),
    ]
    
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='notifications')
    notification_type = models.CharField(max_length=20, choices=NOTIFICATION_TYPES)
    title = models.CharField(max_length=200)
    message = models.TextField()
    is_read = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['-created_at']

class ReminderSettings(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='reminder_settings')
    daily_reminder_enabled = models.BooleanField(default=True)
    reminder_time = models.TimeField(default='09:00:00')
    streak_reminders = models.BooleanField(default=True)
    achievement_notifications = models.BooleanField(default=True)
