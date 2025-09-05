
from django.urls import path
from . import views

urlpatterns = [
    # Course listing and details
    path('', views.CourseListView.as_view(), name='course_list'),
    path('<int:pk>/', views.CourseDetailView.as_view(), name='course_detail'),
    path('<int:course_id>/enroll/', views.enroll_course, name='enroll_course'),
    path('<int:course_id>/lessons/', views.course_lessons, name='course_lessons'),
    path('<int:course_id>/complete/', views.complete_course, name='complete_course'),
    
    # User enrollments and dashboard
    path('my-courses/', views.MyCoursesView.as_view(), name='my_courses'),
    path('my-enrollments/', views.my_enrollments, name='my_enrollments'),
    path('dashboard/', views.dashboard_courses, name='dashboard_courses'),
    
    # Languages and language-specific courses
    path('languages/', views.LanguageListView.as_view(), name='language_list'),
    path('languages/<str:language_code>/', views.language_courses, name='language_courses'),
    path('languages/<str:language_code>/levels/', views.language_levels, name='language_levels'),
    
    # Level operations
    path('levels/<int:level_id>/enroll/', views.enroll_in_level, name='enroll_in_level'),
    path('levels/<int:level_id>/progress/', views.level_progress, name='level_progress'),
]
