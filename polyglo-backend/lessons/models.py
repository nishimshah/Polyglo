from django.db import models
from django.contrib.auth import get_user_model
from courses.models import Course

User = get_user_model()

class Lesson(models.Model):
    LESSON_TYPES = [
        ('text', 'Text'),
        ('audio', 'Audio'),
        ('video', 'Video'),
        ('interactive', 'Interactive'),
    ]
    
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='lessons')
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    lesson_type = models.CharField(max_length=20, choices=LESSON_TYPES)
    content = models.TextField(blank=True)
    audio_file = models.FileField(upload_to='lesson_audio/', null=True, blank=True)
    video_file = models.FileField(upload_to='lesson_videos/', null=True, blank=True)
    transcript = models.TextField(blank=True)
    duration_minutes = models.IntegerField(default=0)
    order = models.PositiveIntegerField()
    is_premium = models.BooleanField(default=False)
    xp_reward = models.IntegerField(default=10)
    estimated_duration = models.IntegerField(default=15) 
    is_active = models.BooleanField(default=True)        
    created_at = models.DateTimeField(auto_now_add=True) 
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        unique_together = ['course', 'order']
        ordering = ['order']
    
    def __str__(self):
        return f"{self.course.title} - Lesson {self.order}: {self.title}"

class LessonCompletion(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    lesson = models.ForeignKey(Lesson, on_delete=models.CASCADE)
    completed_at = models.DateTimeField(auto_now_add=True)
    time_spent_minutes = models.IntegerField(default=0)
    xp_earned = models.IntegerField(default=0)
    
    class Meta:
        unique_together = ['user', 'lesson']

class Content(models.Model):
    CONTENT_TYPE_CHOICES = [
        ('text', 'Text'),
        ('video', 'Video'),
        ('audio', 'Audio'),
        ('quiz', 'Quiz'),
        ('exercise', 'Exercise'),
    ]
    
    lesson = models.ForeignKey(Lesson, on_delete=models.CASCADE, related_name='contents')
    content_type = models.CharField(max_length=50, choices=CONTENT_TYPE_CHOICES, default='text')
    text_content = models.TextField(blank=True)
    video_url = models.URLField(blank=True, null=True)
    audio_url = models.URLField(blank=True, null=True)
    vocabulary_list = models.JSONField(default=list, blank=True)  # For vocabulary items
    order = models.IntegerField()
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        unique_together = ['lesson', 'order']
        ordering = ['lesson', 'order']
    
    def __str__(self):
        return f"{self.lesson.title} - Content {self.order}"