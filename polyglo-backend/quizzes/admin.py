from django.contrib import admin
from .models import Quiz,QuizQuestion,QuizAnswer,QuizAttempt
# Register your models here.
admin.site.register(QuizQuestion),
admin.site.register(QuizAnswer),
admin.site.register(Quiz),
admin.site.register(QuizAttempt),