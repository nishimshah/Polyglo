from django.db import models
from django.contrib.auth import get_user_model
from courses.models import Course, Language
from lessons.models import Lesson

User = get_user_model()

class Quiz(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='quizzes', null=True, blank=True)
    lesson = models.ForeignKey(Lesson, on_delete=models.CASCADE, null=True, blank=True, related_name='quizzes')
    time_limit_minutes = models.IntegerField(default=10)
    passing_score = models.IntegerField(default=70)
    max_attempts = models.IntegerField(default=3)
    is_active = models.BooleanField(default=True)
    xp_reward = models.IntegerField(default=50)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.title
    
    @property
    def question_count(self):
        return self.questions.count()

class QuizQuestion(models.Model):
    QUESTION_TYPES = [
        ('multiple_choice', 'Multiple Choice'),
        ('true_false', 'True/False'),
        ('fill_blank', 'Fill in the Blank'),
        ('matching', 'Matching'),
        ('audio', 'Audio'),
        # Add other types as needed
    ]
    
    quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE, related_name='questions')
    question_type = models.CharField(max_length=20, choices=QUESTION_TYPES)
    question_text = models.TextField()
    options = models.JSONField(default=list, blank=True)  # For MCQ, matching pairs, etc.
    correct_answer = models.JSONField()  # Can be string or object based on question type
    explanation = models.TextField(blank=True)
    points = models.IntegerField(default=10)
    order = models.PositiveIntegerField()
    audio_url = models.URLField(blank=True, null=True)  # For audio questions
    
    class Meta:
        ordering = ['order']
        unique_together = ['quiz', 'order']
    
    def __str__(self):
        return f"{self.quiz.title} - Q{self.order}"

class QuizAttempt(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE)
    started_at = models.DateTimeField(auto_now_add=True, null=True, blank=True)
    completed_at = models.DateTimeField(null=True, blank=True)
    score = models.FloatField(default=0.0)
    total_points = models.IntegerField(default=0)
    earned_points = models.IntegerField(default=0)
    time_spent_seconds = models.IntegerField(default=0)
    passed = models.BooleanField(default=False)
    
    class Meta:
        ordering = ['-started_at']
    
    def __str__(self):
        return f"{self.user.username} - {self.quiz.title} - {self.score}%"

class QuizAnswer(models.Model):
    attempt = models.ForeignKey(QuizAttempt, on_delete=models.CASCADE, related_name='answers')
    question = models.ForeignKey(QuizQuestion, on_delete=models.CASCADE)
    user_answer = models.JSONField()
    is_correct = models.BooleanField(default=False)
    points_earned = models.IntegerField(default=0)
    time_spent_seconds = models.FloatField(default=0)
    
    def __str__(self):
        return f"{self.attempt} - Q{self.question.order}"
