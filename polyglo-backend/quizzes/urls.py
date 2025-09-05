# from django.urls import path
# from . import views

# urlpatterns = [
#     path('<int:pk>/', views.QuizDetailView.as_view(), name='quiz-detail'),
#     path('<int:quiz_id>/start/', views.start_quiz_attempt, name='quiz-start'),
#     path('attempts/<int:attempt_id>/submit/', views.submit_quiz_attempt, name='quiz-submit'),
#     path('my-attempts/', views.user_quiz_attempts, name='user-quiz-attempts'),
# ]
from django.urls import path
from . import views

urlpatterns = [
    path('', views.QuizListView.as_view(), name='quiz-list'),  # Add this line
    path('<int:pk>/', views.QuizDetailView.as_view(), name='quiz-detail'),
    path('<int:quiz_id>/start/', views.start_quiz_attempt, name='quiz-start'),
    path('attempts/<int:attempt_id>/submit/', views.submit_quiz_attempt, name='quiz-submit'),
    path('my-attempts/', views.user_quiz_attempts, name='user-quiz-attempts'),
]
