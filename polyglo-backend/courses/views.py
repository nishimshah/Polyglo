
from rest_framework import generics, filters, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from django_filters.rest_framework import DjangoFilterBackend # type: ignore
from django.db.models import Q, Prefetch, Count
from django.utils import timezone
from .models import Certificate, Course, CourseEnrollment, CourseLevel, Language, LevelEnrollment
from .serializers import CourseSerializer, CourseEnrollmentSerializer, LanguageSerializer
from progress.models import UserProgress, DailyActivity

class CourseListView(generics.ListAPIView):
    serializer_class = CourseSerializer
    permission_classes = [AllowAny]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['course_level__difficulty']
    search_fields = ['title', 'description']

    def get_queryset(self):
        try:
            # Start with basic query
            queryset = Course.objects.filter(is_active=True)
            
            # Only add select_related if the relationships actually exist
            try:
                queryset = queryset.select_related('course_level', 'course_level__language')
            except Exception as e:
                print(f"Select_related failed: {e}")
                # Fall back to basic query without select_related
                queryset = Course.objects.filter(is_active=True)

            # Filter by language code - this is where your error is happening
            language_code = self.request.query_params.get('language', '').strip()
            if language_code:
                # Check if the course has a course_level and if that level has a language
                queryset = queryset.filter(
                    course_level__isnull=False,
                    course_level__language__isnull=False,
                    course_level__language__code=language_code
                )

            # Filter by difficulty
            difficulty = self.request.query_params.get('difficulty', '').strip()
            if difficulty:
                queryset = queryset.filter(
                    course_level__isnull=False,
                    course_level__difficulty__iexact=difficulty
                )

            # Add user-specific data only if user is authenticated
            if self.request.user.is_authenticated:
                try:
                    queryset = queryset.prefetch_related(
                        Prefetch(
                            'enrollments',
                            queryset=CourseEnrollment.objects.filter(user=self.request.user),
                            to_attr='user_enrollments'
                        )
                    )
                except Exception as e:
                    print(f"Prefetch_related failed: {e}")

            return queryset.order_by('id')  # Simple ordering that always works
            
        except Exception as e:
            print(f"CourseListView Error: {str(e)}")
            import traceback
            traceback.print_exc()
            return Course.objects.none()

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['user'] = self.request.user if self.request.user.is_authenticated else None
        return context

class CourseDetailView(generics.RetrieveAPIView):
    serializer_class = CourseSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        try:
            queryset = Course.objects.filter(is_active=True).select_related(
                'course_level',
                'course_level__language'
            )
            
            if self.request.user.is_authenticated:
                queryset = queryset.prefetch_related(
                    Prefetch(
                        'enrollments',
                        queryset=CourseEnrollment.objects.filter(user=self.request.user),
                        to_attr='user_enrollments'
                    )
                )
            
            return queryset
        except Exception as e:
            print(f"Error in CourseDetailView: {e}")
            return Course.objects.none()

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['user'] = self.request.user
        return context
    
    def retrieve(self, request, *args, **kwargs):
        try:
            instance = self.get_object()
            
            if request.user.is_authenticated:
                enrollment = CourseEnrollment.objects.filter(
                    user=request.user,
                    course=instance
                ).first()
                
                if enrollment:
                    enrollment.update_last_accessed()
            
            serializer = self.get_serializer(instance)
            return Response(serializer.data)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def enroll_course(request, course_id):
    """Enroll user in a specific course"""
    try:
        course = Course.objects.select_related(
            'course_level', 
            'course_level__language'
        ).get(id=course_id, is_active=True)
        
        enrollment, created = CourseEnrollment.objects.get_or_create(
            user=request.user, 
            course=course,
            defaults={
                'enrolled_at': timezone.now(),
                'progress_percentage': 0,
                'last_accessed': timezone.now()
            }
        )
        
        if created:
            user = request.user
            if course.course_level and course.course_level.language:
                language_name = course.course_level.language.name
                current_languages = user.learning_languages or []
                if language_name not in current_languages:
                    current_languages.append(language_name)
                    user.learning_languages = current_languages
                    user.save()
            
            user_progress, _ = UserProgress.objects.get_or_create(user=request.user)
            
            today = timezone.now().date()
            daily_activity, _ = DailyActivity.objects.get_or_create(
                user=request.user,
                date=today,
                defaults={'study_time_minutes': 0, 'lessons_completed': 0, 'xp_earned': 0}
            )
            
            return Response({
                'message': 'Successfully enrolled in course',
                'enrollment': CourseEnrollmentSerializer(enrollment).data
            }, status=status.HTTP_201_CREATED)
        else:
            enrollment.update_last_accessed()
            return Response({
                'message': 'Already enrolled in this course',
                'enrollment': CourseEnrollmentSerializer(enrollment).data
            }, status=status.HTTP_200_OK)
        
    except Course.DoesNotExist:
        return Response({'error': 'Course not found'}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def course_lessons(request, course_id):
    """Get all lessons for a specific course"""
    try:
        course = Course.objects.get(id=course_id, is_active=True)
        
        enrollment = CourseEnrollment.objects.filter(
            user=request.user,
            course=course
        ).first()
        
        if not enrollment:
            return Response({'error': 'You must be enrolled in this course'}, status=status.HTTP_403_FORBIDDEN)
        
        enrollment.update_last_accessed()
        
        lessons_data = []
        if hasattr(course, 'lessons'):
            lessons = course.lessons.filter(is_active=True).order_by('order')
            
            for lesson in lessons:
                lesson_completion = None
                if hasattr(lesson, 'lesson_completions'):
                    lesson_completion = lesson.lesson_completions.filter(user=request.user).first()
                
                lesson_data = {
                    'id': lesson.id,
                    'title': lesson.title,
                    'description': getattr(lesson, 'description', ''),
                    'order': getattr(lesson, 'order', 0),
                    'lesson_type': getattr(lesson, 'lesson_type', 'text'),
                    'duration_minutes': getattr(lesson, 'duration_minutes', 15),
                    'xp_reward': getattr(lesson, 'xp_reward', 10),
                    'is_premium': getattr(lesson, 'is_premium', False),
                    'is_completed': lesson_completion is not None,
                    'completed_at': lesson_completion.completed_at if lesson_completion else None,
                    'score': getattr(lesson_completion, 'score', None) if lesson_completion else None
                }
                lessons_data.append(lesson_data)
        
        return Response(lessons_data)
        
    except Course.DoesNotExist:
        return Response({'error': 'Course not found'}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET'])
@permission_classes([AllowAny])
def language_courses(request, language_code):
    """Get all courses for a specific language grouped by difficulty"""
    try:
        language = Language.objects.get(code=language_code)
        
        course_levels = CourseLevel.objects.filter(
            language=language, 
            is_active=True
        ).order_by('order')
        
        courses_by_level = {}
        
        for level in course_levels:
            courses = Course.objects.filter(
                course_level=level,
                is_active=True
            ).order_by('order')
            
            if request.user.is_authenticated:
                for course in courses:
                    enrollment = CourseEnrollment.objects.filter(
                        user=request.user,
                        course=course
                    ).first()
                    
                    course.is_enrolled = enrollment is not None
                    course.is_completed = enrollment.is_completed if enrollment else False
                    course.progress_percentage = enrollment.progress_percentage if enrollment else 0
            else:
                for course in courses:
                    course.is_enrolled = False
                    course.is_completed = False
                    course.progress_percentage = 0
            
            difficulty = level.difficulty.lower()
            if difficulty not in courses_by_level:
                courses_by_level[difficulty] = []
            
            courses_by_level[difficulty].extend([
                {
                    'id': course.id,
                    'title': course.title,
                    'description': course.description,
                    'difficulty': level.difficulty,
                    'order': course.order,
                    'total_lessons': course.total_lessons,
                    'estimated_duration': course.estimated_duration,
                    'xp_reward': course.xp_reward,
                    'is_premium': course.is_premium,
                    'average_rating': course.average_rating,
                    'is_enrolled': course.is_enrolled,
                    'is_completed': course.is_completed,
                    'progress_percentage': course.progress_percentage,
                    'language': {
                        'id': language.id,
                        'name': language.name,
                        'code': language.code,
                        'flag_image': language.flag_image.url if language.flag_image else None
                    }
                } for course in courses
            ])
        
        return Response({
            'language': {
                'id': language.id,
                'name': language.name,
                'code': language.code,
                'flag_image': language.flag_image.url if language.flag_image else None,
                'description': language.description
            },
            'courses_by_level': courses_by_level
        })
        
    except Language.DoesNotExist:
        return Response({'error': 'Language not found'}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def language_levels(request, language_code):
    """Get all levels for a specific language with user progress"""
    try:
        language = Language.objects.get(code=language_code)
        levels = CourseLevel.objects.filter(
            language=language, 
            is_active=True
        ).order_by('order')
        
        levels_data = []
        for level in levels:
            previous_level_completed = True
            if level.required_previous_level:
                previous_level_completed = LevelEnrollment.objects.filter(
                    user=request.user,
                    course_level=level.required_previous_level,
                    completed_at__isnull=False
                ).exists()
            
            level_enrollment = LevelEnrollment.objects.filter(
                user=request.user,
                course_level=level
            ).first()
            
            total_courses = level.courses.filter(is_active=True).count()
            enrolled_courses = CourseEnrollment.objects.filter(
                user=request.user,
                course__course_level=level
            ).count()
            completed_courses = CourseEnrollment.objects.filter(
                user=request.user,
                course__course_level=level,
                completed_at__isnull=False
            ).count()
            
            level_data = {
                'id': level.id,
                'title': level.title,
                'description': level.description,
                'difficulty': level.difficulty,
                'order': level.order,
                'total_courses': total_courses,
                'enrolled_courses': enrolled_courses,
                'completed_courses': completed_courses,
                'is_enrolled': level_enrollment is not None,
                'is_completed': level_enrollment.is_completed if level_enrollment else False,
                'progress_percentage': level_enrollment.progress_percentage if level_enrollment else 0,
                'previous_level_completed': previous_level_completed,
                'required_previous_level': {
                    'id': level.required_previous_level.id,
                    'title': level.required_previous_level.title
                } if level.required_previous_level else None,
                'language': {
                    'name': language.name,
                    'code': language.code,
                    'flag_image': language.flag_image.url if language.flag_image else None
                }
            }
            levels_data.append(level_data)
        
        return Response(levels_data)
        
    except Language.DoesNotExist:
        return Response({'error': 'Language not found'}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def enroll_in_level(request, level_id):
    """Enroll user in a course level"""
    try:
        level = CourseLevel.objects.get(id=level_id, is_active=True)
        
        if level.required_previous_level:
            previous_completed = LevelEnrollment.objects.filter(
                user=request.user,
                course_level=level.required_previous_level,
                completed_at__isnull=False
            ).exists()
            
            if not previous_completed:
                return Response({
                    'error': 'You must complete the previous level first'
                }, status=status.HTTP_400_BAD_REQUEST)
        
        enrollment, created = LevelEnrollment.objects.get_or_create(
            user=request.user,
            course_level=level,
            defaults={
                'current_course': level.courses.filter(is_active=True).first(),
                'enrolled_at': timezone.now()
            }
        )
        
        return Response({
            'message': 'Successfully enrolled in level',
            'enrollment_id': enrollment.id,
            'created': created
        }, status=status.HTTP_201_CREATED if created else status.HTTP_200_OK)
        
    except CourseLevel.DoesNotExist:
        return Response({'error': 'Level not found'}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def level_progress(request, level_id):
    """Get detailed progress for a specific level"""
    try:
        level = CourseLevel.objects.get(id=level_id, is_active=True)
        enrollment = LevelEnrollment.objects.filter(
            user=request.user, 
            course_level=level
        ).first()
        
        if not enrollment:
            return Response({'error': 'Not enrolled in this level'}, status=status.HTTP_404_NOT_FOUND)
        
        courses = Course.objects.filter(
            course_level=level, 
            is_active=True
        ).order_by('order')
        
        courses_data = []
        for course in courses:
            course_enrollment = CourseEnrollment.objects.filter(
                user=request.user,
                course=course
            ).first()
            
            course_data = {
                'id': course.id,
                'title': course.title,
                'description': course.description,
                'order': course.order,
                'total_lessons': course.total_lessons,
                'estimated_duration': course.estimated_duration,
                'passing_score': getattr(course, 'passing_score', 70),
                'is_enrolled': course_enrollment is not None,
                'is_completed': course_enrollment.is_completed if course_enrollment else False,
                'progress_percentage': course_enrollment.progress_percentage if course_enrollment else 0,
                'best_score': course_enrollment.best_score if course_enrollment else 0
            }
            courses_data.append(course_data)
        
        certificate = Certificate.objects.filter(
            user=request.user,
            course_level=level
        ).first()
        
        next_level = CourseLevel.objects.filter(
            language=level.language,
            order=level.order + 1,
            is_active=True
        ).first()
        
        return Response({
            'level': {
                'id': level.id,
                'title': level.title,
                'description': level.description,
                'difficulty': level.difficulty,
                'language': {
                    'name': level.language.name,
                    'code': level.language.code,
                    'flag_image': level.language.flag_image.url if level.language.flag_image else None
                }
            },
            'enrollment': {
                'id': enrollment.id,
                'progress_percentage': enrollment.progress_percentage,
                'enrolled_at': enrollment.enrolled_at,
                'completed_at': enrollment.completed_at
            },
            'courses': courses_data,
            'progress': {
                'percentage': enrollment.progress_percentage,
                'completed_courses': len([c for c in courses_data if c['is_completed']]),
                'total_courses': len(courses_data)
            },
            'certificate': {
                'id': certificate.id,
                'certificate_id': certificate.certificate_id,
                'issued_at': certificate.issued_at
            } if certificate else None,
            'next_level': {
                'id': next_level.id,
                'title': next_level.title,
                'difficulty': next_level.difficulty
            } if next_level else None
        })
        
    except CourseLevel.DoesNotExist:
        return Response({'error': 'Level not found'}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def my_enrollments(request):
    """Get user's course enrollments with progress data"""
    try:
        enrollments = CourseEnrollment.objects.filter(
            user=request.user
        ).select_related(
            'course', 
            'course__course_level', 
            'course__course_level__language'
        ).order_by('-last_accessed', '-enrolled_at')
        
        enrollments_data = []
        for enrollment in enrollments:
            course = enrollment.course
            language = course.course_level.language if course.course_level else None
            
            enrollment_data = {
                'id': enrollment.id,
                'progress_percentage': enrollment.progress_percentage or 0,
                'enrolled_at': enrollment.enrolled_at,
                'completed_at': enrollment.completed_at,
                'best_score': enrollment.best_score or 0,
                'is_completed': enrollment.is_completed,
                'last_accessed': enrollment.last_accessed,
                'time_since_last_access': enrollment.time_since_last_access,
                'grade_letter': enrollment.get_grade_letter(),
                'course': {
                    'id': course.id,
                    'title': course.title,
                    'description': course.description,
                    'estimated_duration': course.estimated_duration,
                    'difficulty': course.course_level.difficulty if course.course_level else 'beginner',
                    'language': {
                        'id': language.id if language else None,
                        'name': language.name if language else 'Unknown',
                        'code': language.code if language else 'unknown',
                        'flag_image': language.flag_image.url if language and language.flag_image else None
                    } if language else None
                }
            }
            enrollments_data.append(enrollment_data)
        
        return Response(enrollments_data)
        
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class MyCoursesView(generics.ListAPIView):
    serializer_class = CourseEnrollmentSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        return CourseEnrollment.objects.filter(
            user=self.request.user
        ).select_related(
            'course',
            'course__course_level',
            'course__course_level__language'
        ).order_by('-last_accessed', '-enrolled_at')


class LanguageListView(generics.ListAPIView):
    serializer_class = LanguageSerializer
    permission_classes = [AllowAny]
    
    def get_queryset(self):
        return Language.objects.filter(is_active=True).annotate(
            total_levels=Count('levels', filter=Q(levels__is_active=True)),
            total_courses=Count('levels__courses', filter=Q(
                levels__is_active=True,
                levels__courses__is_active=True
            ))
        ).order_by('name')

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['user'] = self.request.user if self.request.user.is_authenticated else None
        return context


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def complete_course(request, course_id):
    """Mark a course as completed"""
    try:
        course = Course.objects.get(id=course_id, is_active=True)
        enrollment = CourseEnrollment.objects.get(
            user=request.user,
            course=course
        )
        
        score = request.data.get('score', 100)
        
        if not enrollment.is_completed:
            enrollment.completed_at = timezone.now()
            enrollment.progress_percentage = 100
            enrollment.update_progress(new_score=score)
            
            user = request.user
            user.lessons_completed_count = (user.lessons_completed_count or 0) + 1
            user.total_xp = (user.total_xp or 0) + (course.xp_reward or 100)
            user.save()
            
            today = timezone.now().date()
            daily_activity, created = DailyActivity.objects.get_or_create(
                user=request.user,
                date=today,
                defaults={'study_time_minutes': 0, 'lessons_completed': 0, 'xp_earned': 0}
            )
            daily_activity.lessons_completed += 1
            daily_activity.xp_earned += (course.xp_reward or 100)
            daily_activity.save()
            
            return Response({
                'message': 'Course completed successfully',
                'xp_earned': course.xp_reward or 100,
                'grade': enrollment.get_grade_letter()
            })
        else:
            return Response({'message': 'Course already completed'})
            
    except Course.DoesNotExist:
        return Response({'error': 'Course not found'}, status=status.HTTP_404_NOT_FOUND)
    except CourseEnrollment.DoesNotExist:
        return Response({'error': 'Enrollment not found'}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def dashboard_courses(request):
    """Get courses for user dashboard"""
    try:
        recent_enrollments = CourseEnrollment.objects.filter(
            user=request.user
        ).select_related(
            'course',
            'course__course_level',
            'course__course_level__language'
        ).order_by('-enrolled_at')[:5]
        
        in_progress = CourseEnrollment.objects.filter(
            user=request.user,
            progress_percentage__gt=0,
            progress_percentage__lt=100
        ).select_related(
            'course',
            'course__course_level',
            'course__course_level__language'
        ).order_by('-last_accessed')[:3]
        
        completed = CourseEnrollment.objects.filter(
            user=request.user,
            completed_at__isnull=False
        ).select_related(
            'course',
            'course__course_level',
            'course__course_level__language'
        ).order_by('-completed_at')[:3]
        
        return Response({
            'recent_enrollments': CourseEnrollmentSerializer(recent_enrollments, many=True).data,
            'in_progress': CourseEnrollmentSerializer(in_progress, many=True).data,
            'completed': CourseEnrollmentSerializer(completed, many=True).data,
            'stats': {
                'total_enrolled': CourseEnrollment.objects.filter(user=request.user).count(),
                'total_completed': CourseEnrollment.objects.filter(
                    user=request.user, 
                    completed_at__isnull=False
                ).count(),
                'total_in_progress': CourseEnrollment.objects.filter(
                    user=request.user,
                    progress_percentage__gt=0,
                    progress_percentage__lt=100
                ).count()
            }
        })
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
