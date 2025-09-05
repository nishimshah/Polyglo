from rest_framework import generics, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.utils import timezone
from django.db.models import Sum, Count
from datetime import datetime, timedelta, date
from .models import UserProgress, DailyActivity
from .serializers import (
    UserProgressSerializer, 
    DailyActivitySerializer, 
    ProgressSummarySerializer,
    WeeklyProgressSerializer
)
from courses.models import CourseEnrollment, LevelEnrollment
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def dashboard_stats(request):
    """Get dashboard statistics for the current user"""
    user = request.user
    today = timezone.now().date()
    week_ago = today - timedelta(days=7)
    
    # Get recent daily activity
    try:
        today_activity = DailyActivity.objects.get(user=user, date=today)
        minutes_today = today_activity.study_time_minutes
        xp_today = today_activity.xp_earned
    except DailyActivity.DoesNotExist:
        minutes_today = 0
        xp_today = 0
    
    # Get week's activity
    week_activities = DailyActivity.objects.filter(
        user=user, 
        date__gte=week_ago
    )
    
    xp_this_week = sum(activity.xp_earned for activity in week_activities)
    lessons_this_week = sum(activity.lessons_completed for activity in week_activities)
    
    # Get course statistics
    total_enrollments = CourseEnrollment.objects.filter(user=user).count()
    completed_courses = CourseEnrollment.objects.filter(
        user=user, 
        completed_at__isnull=False
    ).count()
    
    stats = {
        'current_streak': user.current_streak or 0,
        'longest_streak': user.longest_streak or 0,
        'total_xp': user.total_xp or 0,
        'daily_goal': user.daily_goal or 15,
        'total_courses': total_enrollments,
        'completed_courses': completed_courses,
        'recent_activity': {
            'minutes_today': minutes_today,
            'xp_today': xp_today,
            'xp_this_week': xp_this_week,
            'lessons_this_week': lessons_this_week,
        }
    }
    
    return Response(stats)

class UserProgressView(generics.RetrieveUpdateAPIView):
    serializer_class = UserProgressSerializer
    permission_classes = [IsAuthenticated]
    
    def get_object(self):
        progress, created = UserProgress.objects.get_or_create(user=self.request.user)
        return progress

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def progress_summary(request):
    """Get comprehensive progress summary for dashboard"""
    user = request.user
    
    # Get or create user progress
    user_progress, created = UserProgress.objects.get_or_create(user=user)
    
    # Get today's activity
    today = date.today()
    today_activity, _ = DailyActivity.objects.get_or_create(
        user=user, 
        date=today,
        defaults={'study_time_minutes': 0, 'lessons_completed': 0, 'xp_earned': 0}
    )
    
    # Calculate streaks
    current_streak = calculate_current_streak(user)
    longest_streak = calculate_longest_streak(user)
    
    # Weekly stats (last 7 days)
    week_start = today - timedelta(days=6)
    weekly_activities = DailyActivity.objects.filter(
        user=user, 
        date__gte=week_start
    ).aggregate(
        total_study_time=Sum('study_time_minutes') or 0,
        total_lessons=Sum('lessons_completed') or 0,
        total_xp=Sum('xp_earned') or 0,
        active_days=Count('id')
    )
    
    # Monthly stats (last 30 days)
    month_start = today - timedelta(days=29)
    monthly_activities = DailyActivity.objects.filter(
        user=user,
        date__gte=month_start
    ).aggregate(
        total_study_time=Sum('study_time_minutes') or 0,
        total_lessons=Sum('lessons_completed') or 0,
        total_xp=Sum('xp_earned') or 0,
        active_days=Count('id')
    )
    
    # Recent activities (last 7 days)
    recent_activities = DailyActivity.objects.filter(
        user=user,
        date__gte=week_start
    ).order_by('-date')
    
    data = {
        'user_progress': user_progress,
        'current_streak': current_streak,
        'longest_streak': longest_streak,
        'today_activity': today_activity,
        'weekly_stats': weekly_activities,
        'monthly_stats': monthly_activities,
        'recent_activities': recent_activities
    }
    
    serializer = ProgressSummarySerializer(data)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def weekly_progress_chart(request):
    """Get weekly progress data for charts"""
    user = request.user
    
    # Get last 7 days
    end_date = date.today()
    start_date = end_date - timedelta(days=6)
    
    # Generate all dates in range
    dates = []
    study_time = []
    lessons_completed = []
    xp_earned = []
    
    current_date = start_date
    while current_date <= end_date:
        dates.append(current_date.strftime('%m/%d'))
        
        try:
            activity = DailyActivity.objects.get(user=user, date=current_date)
            study_time.append(activity.study_time_minutes)
            lessons_completed.append(activity.lessons_completed)
            xp_earned.append(activity.xp_earned)
        except DailyActivity.DoesNotExist:
            study_time.append(0)
            lessons_completed.append(0)
            xp_earned.append(0)
        
        current_date += timedelta(days=1)
    
    data = {
        'dates': dates,
        'study_time': study_time,
        'lessons_completed': lessons_completed,
        'xp_earned': xp_earned
    }
    
    serializer = WeeklyProgressSerializer(data)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def update_daily_activity(request):
    """Update today's activity and sync with user model"""
    user = request.user
    today = date.today()
    
    study_time = request.data.get('study_time_minutes', 0)
    lessons = request.data.get('lessons_completed', 0)
    quizzes = request.data.get('quizzes_completed', 0)
    flashcards = request.data.get('flashcards_reviewed', 0)
    xp = request.data.get('xp_earned', 0)
    
    activity, created = DailyActivity.objects.get_or_create(
        user=user,
        date=today,
        defaults={
            'study_time_minutes': study_time,
            'lessons_completed': lessons,
            'xp_earned': xp
        }
    )
    
    if not created:
        activity.study_time_minutes += study_time
        activity.lessons_completed += lessons
        activity.xp_earned += xp
        activity.save()
    
    # Update user model with cumulative data
    user.total_study_time += study_time
    user.total_xp += xp
    
    if lessons > 0:
        user.lessons_completed_count += lessons
    if quizzes > 0:
        user.quizzes_completed_count += quizzes
    if flashcards > 0:
        user.flashcards_reviewed_count += flashcards
    
    # Update streak
    user.current_streak = calculate_current_streak(user)
    user.longest_streak = max(user.longest_streak, user.current_streak)
    
    user.save()
    
    # Update UserProgress model as well
    user_progress, _ = UserProgress.objects.get_or_create(user=user)
    user_progress.total_study_time = user.total_study_time
    user_progress.lessons_completed = user.lessons_completed_count
    user_progress.quizzes_completed = user.quizzes_completed_count
    user_progress.flashcards_reviewed = user.flashcards_reviewed_count
    user_progress.save()
    
    return Response({
        'message': 'Activity updated successfully',
        'user_stats': {
            'total_xp': user.total_xp,
            'current_streak': user.current_streak,
            'total_study_time': user.total_study_time,
            'lessons_completed': user.lessons_completed_count
        }
    })

def calculate_current_streak(user):
    """Calculate current study streak"""
    today = date.today()
    streak = 0
    current_date = today
    
    while True:
        try:
            activity = DailyActivity.objects.get(user=user, date=current_date)
            if activity.study_time_minutes > 0 or activity.lessons_completed > 0:
                streak += 1
                current_date -= timedelta(days=1)
            else:
                break
        except DailyActivity.DoesNotExist:
            break
    
    return streak

def calculate_longest_streak(user):
    """Calculate longest study streak"""
    activities = DailyActivity.objects.filter(user=user).order_by('date')
    
    if not activities:
        return 0
    
    longest_streak = 0
    current_streak = 0
    
    prev_date = None
    for activity in activities:
        if activity.study_time_minutes > 0 or activity.lessons_completed > 0:
            if prev_date is None or activity.date == prev_date + timedelta(days=1):
                current_streak += 1
                longest_streak = max(longest_streak, current_streak)
            else:
                current_streak = 1
        else:
            current_streak = 0
        prev_date = activity.date
    
    return longest_streak
