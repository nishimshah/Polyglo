from django.urls import path
from . import views

urlpatterns = [
    path('course/<int:course_id>/', views.LessonListView.as_view(), name='course-lessons'),
    path('<int:pk>/', views.LessonDetailView.as_view(), name='lesson-detail'),
    path('<int:lesson_id>/complete/', views.complete_lesson, name='complete-lesson'),
    
]
