from rest_framework import generics, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
from django.utils import timezone

from .models import Quiz, QuizQuestion, QuizAttempt, QuizAnswer
from .serializers import QuizSerializer, QuizAttemptSerializer, QuizAnswerSerializer

class QuizListView(generics.ListAPIView):
    queryset = Quiz.objects.filter(is_active=True)
    serializer_class = QuizSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        # You can add additional filtering here if needed
        return Quiz.objects.filter(is_active=True)

class QuizDetailView(generics.RetrieveAPIView):
    queryset = Quiz.objects.filter(is_active=True)
    serializer_class = QuizSerializer
    permission_classes = [IsAuthenticated]


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def start_quiz_attempt(request, quiz_id):
    print(f"🔍 User: {request.user}")
    print(f"🔒 Is authenticated: {request.user.is_authenticated}")
    print(f"📨 Headers: {dict(request.headers)}")
    
    try:
        # Get the quiz
        quiz = get_object_or_404(Quiz, id=quiz_id, is_active=True)
        user = request.user
        
        print(f"📚 Found quiz: {quiz.title}")
        
        # Check max attempts if applicable
        attempts_count = QuizAttempt.objects.filter(user=user, quiz=quiz).count()
        print(f"🔢 User has {attempts_count} previous attempts (max: {quiz.max_attempts})")
        
        if attempts_count >= quiz.max_attempts:
            return Response({
                'error': 'Maximum number of attempts reached.'
            }, status=status.HTTP_403_FORBIDDEN)
        
        # Create new quiz attempt
        attempt = QuizAttempt.objects.create(
            user=user, 
            quiz=quiz,
            started_at=timezone.now()  # Make sure to set started_at
        )
        
        print(f"✅ Created quiz attempt with ID: {attempt.id}")
        
        # Serialize and return the attempt
        serializer = QuizAttemptSerializer(attempt)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
        
    except Quiz.DoesNotExist:
        print(f"❌ Quiz with ID {quiz_id} not found")
        return Response({
            'error': 'Quiz not found'
        }, status=status.HTTP_404_NOT_FOUND)
        
    except Exception as e:
        print(f"❌ Unexpected error: {e}")
        import traceback
        traceback.print_exc()
        return Response({
            'error': f'An error occurred: {str(e)}'
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)



@api_view(['POST'])
@permission_classes([IsAuthenticated])
def submit_quiz_attempt(request, attempt_id):
    try:
        user = request.user
        attempt = get_object_or_404(QuizAttempt, id=attempt_id, user=user, completed_at__isnull=True)
        
        answers_data = request.data.get('answers', {})
        time_spent = request.data.get('time_spent', 0)
        
        print(f"Received answers: {answers_data}")  # Debug log
        print(f"Time spent: {time_spent}")  # Debug log
        
        total_points = 0
        earned_points = 0
        
        # Process each submitted answer
        for question_id_str, user_answer in answers_data.items():
            try:
                # Convert question ID string to integer
                question_id = int(question_id_str)
                
                # Get question by ID, not by index
                question = QuizQuestion.objects.get(id=question_id, quiz=attempt.quiz)
                
                print(f"Processing question {question_id}: {question.question_text[:50]}...")  # Debug log
                
                # Determine if answer is correct
                correct_answer = question.correct_answer
                is_correct = False
                
                # Handle different answer formats
                if isinstance(correct_answer, str):
                    is_correct = str(user_answer).strip().lower() == correct_answer.strip().lower()
                elif isinstance(correct_answer, list):
                    is_correct = user_answer in correct_answer
                else:
                    is_correct = user_answer == correct_answer
                
                points_earned = question.points if is_correct else 0
                total_points += question.points
                earned_points += points_earned
                
                # Create or update QuizAnswer
                QuizAnswer.objects.update_or_create(
                    attempt=attempt,
                    question=question,
                    defaults={
                        'user_answer': user_answer,
                        'is_correct': is_correct,
                        'points_earned': points_earned,
                        'time_spent_seconds': 0,
                    }
                )
                
                print(f"Question {question_id}: {user_answer} - {'Correct' if is_correct else 'Incorrect'} ({points_earned} points)")
                
            except (ValueError, QuizQuestion.DoesNotExist) as e:
                print(f"Error processing question {question_id_str}: {e}")
                continue
        
        # Calculate score percentage
        score_percentage = (earned_points / total_points) * 100 if total_points > 0 else 0
        passed = score_percentage >= attempt.quiz.passing_score
        
        # Update attempt
        attempt.score = score_percentage
        attempt.total_points = total_points
        attempt.earned_points = earned_points
        attempt.time_spent_seconds = time_spent
        attempt.passed = passed
        attempt.completed_at = timezone.now()
        attempt.save()
        
        print(f"Quiz submitted successfully: {score_percentage}% - {'Passed' if passed else 'Failed'}")
        
        serializer = QuizAttemptSerializer(attempt)
        return Response(serializer.data, status=status.HTTP_200_OK)
        
    except Exception as e:
        print(f"Unexpected error in submit_quiz_attempt: {e}")
        import traceback
        traceback.print_exc()
        return Response(
            {'error': f'An error occurred while submitting the quiz: {str(e)}'},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_quiz_attempts(request):
    user = request.user
    attempts = QuizAttempt.objects.filter(user=user).order_by('-started_at')
    serializer = QuizAttemptSerializer(attempts, many=True)
    return Response(serializer.data)
