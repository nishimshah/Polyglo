# from django.urls import path
# from . import views

# urlpatterns = [
#     path('', views.UserProgressView.as_view(), name='user-progress'),
#     path('summary/', views.progress_summary, name='progress-summary'),
#     path('weekly-chart/', views.weekly_progress_chart, name='weekly-progress-chart'),
#     path('update-activity/', views.update_daily_activity, name='update-daily-activity'),
#     path('dashboard-stats/', views.dashboard_stats, name='dashboard_stats'),

# ]

from django.urls import path
from . import views

urlpatterns = [
    # Dashboard and progress
    path('dashboard-stats/', views.dashboard_stats, name='dashboard_stats'),
    path('summary/', views.progress_summary, name='progress_summary'),
    path('user-progress/', views.UserProgressView.as_view(), name='user_progress'),
    
    # Charts and analytics
    path('weekly-chart/', views.weekly_progress_chart, name='weekly_progress_chart'),
    
    # Activity updates
    path('update-activity/', views.update_daily_activity, name='update_daily_activity'),
]
