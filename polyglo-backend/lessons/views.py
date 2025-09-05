from rest_framework import generics, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated,AllowAny
from .models import Lesson, LessonCompletion
from .serializers import LessonSerializer, LessonCompletionSerializer
from courses.models import Course

class LessonListView(generics.ListAPIView):
    serializer_class = LessonSerializer
    permission_classes = [AllowAny] 
    
    def get_queryset(self):
        course_id = self.kwargs.get('course_id')
        return Lesson.objects.filter(course_id=course_id).order_by('order')
    
    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        # Return the data directly as an array, not wrapped in pagination
        return Response(serializer.data)

class LessonDetailView(generics.RetrieveAPIView):
    queryset = Lesson.objects.all()
    serializer_class = LessonSerializer
    permission_classes = [IsAuthenticated]

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def complete_lesson(request, lesson_id):
    try:
        lesson = Lesson.objects.get(id=lesson_id)
        completion, created = LessonCompletion.objects.get_or_create(
            user=request.user,
            lesson=lesson,
            defaults={
                'time_spent_minutes': request.data.get('time_spent', 0),
                'xp_earned': lesson.xp_reward
            }
        )
        
        if created:
            # Update user's total XP
            request.user.total_xp += lesson.xp_reward
            request.user.save()
            
            return Response({
                'message': 'Lesson completed!',
                'xp_earned': lesson.xp_reward,
                'completion': LessonCompletionSerializer(completion).data
            }, status=status.HTTP_201_CREATED)
        else:
            return Response({
                'message': 'Lesson already completed',
                'completion': LessonCompletionSerializer(completion).data
            }, status=status.HTTP_200_OK)
            
    except Lesson.DoesNotExist:
        return Response({'error': 'Lesson not found'}, status=status.HTTP_404_NOT_FOUND)
