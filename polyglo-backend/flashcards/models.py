from django.db import models
from django.contrib.auth import get_user_model
from lessons.models import Lesson

User = get_user_model()

class FlashCard(models.Model):
    lesson = models.ForeignKey(Lesson, on_delete=models.CASCADE, related_name='flashcards')
    word = models.CharField(max_length=200)
    translation = models.CharField(max_length=200)
    pronunciation = models.CharField(max_length=200, blank=True)
    audio_pronunciation = models.FileField(upload_to='pronunciations/', null=True, blank=True)
    image = models.ImageField(upload_to='flashcard_images/', null=True, blank=True)
    example_sentence = models.TextField(blank=True)
    example_translation = models.TextField(blank=True)
    difficulty_level = models.IntegerField(default=1, choices=[(i, i) for i in range(1, 6)])
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"{self.word} - {self.translation}"

class FlashCardReview(models.Model):
    REVIEW_RATINGS = [
        (1, 'Again'),
        (2, 'Hard'),
        (3, 'Good'),
        (4, 'Easy'),
    ]
    
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    flashcard = models.ForeignKey(FlashCard, on_delete=models.CASCADE)
    rating = models.IntegerField(choices=REVIEW_RATINGS)
    interval_days = models.IntegerField(default=1)
    ease_factor = models.FloatField(default=2.5)
    next_review_date = models.DateTimeField()
    reviewed_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        unique_together = ['user', 'flashcard']
