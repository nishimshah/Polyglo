# from rest_framework import serializers
# from .models import UserProgress, DailyActivity
# from django.utils import timezone
# from datetime import datetime, timedelta
# from rest_framework import serializers
# from .models import UserProgress, DailyActivity

# # class UserProgressSerializer(serializers.ModelSerializer):
# #     class Meta:
# #         model = UserProgress
# #         fields = '__all__'

# class UserProgressSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = UserProgress
#         fields = ['total_study_time', 'lessons_completed', 'quizzes_completed', 
#                  'flashcards_reviewed', 'created_at', 'updated_at']
        
# class DailyActivitySerializer(serializers.ModelSerializer):
#     class Meta:
#         model = DailyActivity
#         fields = '__all__'

# class ProgressSummarySerializer(serializers.Serializer):
#     user_progress = UserProgressSerializer()
#     current_streak = serializers.IntegerField()
#     longest_streak = serializers.IntegerField()
#     today_activity = DailyActivitySerializer()
#     weekly_stats = serializers.DictField()
#     monthly_stats = serializers.DictField()
#     recent_activities = DailyActivitySerializer(many=True)

# class WeeklyProgressSerializer(serializers.Serializer):
#     dates = serializers.ListField(child=serializers.CharField())
#     study_time = serializers.ListField(child=serializers.IntegerField())
#     lessons_completed = serializers.ListField(child=serializers.IntegerField())
#     xp_earned = serializers.ListField(child=serializers.IntegerField())


# class DailyActivitySerializer(serializers.ModelSerializer):
#     class Meta:
#         model = DailyActivity
#         fields = ['date', 'study_time_minutes', 'lessons_completed', 'xp_earned']

# class ProgressSummarySerializer(serializers.Serializer):
#     """Comprehensive progress summary for dashboard"""
#     user_progress = UserProgressSerializer(read_only=True)
#     current_streak = serializers.IntegerField()
#     longest_streak = serializers.IntegerField()
#     today_activity = DailyActivitySerializer(read_only=True)
#     weekly_stats = serializers.DictField()
#     monthly_stats = serializers.DictField()
#     recent_activities = DailyActivitySerializer(many=True, read_only=True)
    
# class WeeklyProgressSerializer(serializers.Serializer):
#     """Weekly progress chart data"""
#     dates = serializers.ListField(child=serializers.CharField())
#     study_time = serializers.ListField(child=serializers.IntegerField())
#     lessons_completed = serializers.ListField(child=serializers.IntegerField())
#     xp_earned = serializers.ListField(child=serializers.IntegerField())

# In your progress/serializers.py - Clean version

from rest_framework import serializers
from .models import UserProgress, DailyActivity

class UserProgressSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProgress
        fields = ['total_study_time', 'lessons_completed', 'quizzes_completed', 
                 'flashcards_reviewed', 'created_at', 'updated_at']

class DailyActivitySerializer(serializers.ModelSerializer):
    class Meta:
        model = DailyActivity
        fields = ['date', 'study_time_minutes', 'lessons_completed', 'xp_earned']

class ProgressSummarySerializer(serializers.Serializer):
    """Comprehensive progress summary for dashboard"""
    user_progress = UserProgressSerializer(read_only=True)
    current_streak = serializers.IntegerField()
    longest_streak = serializers.IntegerField()
    today_activity = DailyActivitySerializer(read_only=True)
    weekly_stats = serializers.DictField()
    monthly_stats = serializers.DictField()
    recent_activities = DailyActivitySerializer(many=True, read_only=True)
    
class WeeklyProgressSerializer(serializers.Serializer):
    """Weekly progress chart data"""
    dates = serializers.ListField(child=serializers.CharField())
    study_time = serializers.ListField(child=serializers.IntegerField())
    lessons_completed = serializers.ListField(child=serializers.IntegerField())
    xp_earned = serializers.ListField(child=serializers.IntegerField())
