
from rest_framework import serializers
from .models import Course, CourseRating, Language, CourseEnrollment, CourseLevel, LevelEnrollment, Certificate

class LanguageSerializer(serializers.ModelSerializer):
    total_levels = serializers.SerializerMethodField()
    estimated_hours = serializers.SerializerMethodField()
    learners_count = serializers.SerializerMethodField()
    
    class Meta:
        model = Language
        fields = [
            'id', 'name', 'code', 'description', 'flag_image', 
            'is_active', 'created_at', 'total_levels', 
            'estimated_hours', 'learners_count'
        ]
    
    def get_total_levels(self, obj):
        return obj.levels.filter(is_active=True).count()
    
    def get_estimated_hours(self, obj):
        return obj.levels.filter(is_active=True).aggregate(
            total=serializers.models.Sum('estimated_duration')
        )['total'] or 45
    
    def get_learners_count(self, obj):
        from django.db.models import Count
        return LevelEnrollment.objects.filter(
            course_level__language=obj
        ).values('user').distinct().count()


class CourseLevelSerializer(serializers.ModelSerializer):
    language = LanguageSerializer(read_only=True)
    total_courses = serializers.SerializerMethodField()
    estimated_duration_hours = serializers.SerializerMethodField()
    is_enrolled = serializers.SerializerMethodField()
    is_completed = serializers.SerializerMethodField()
    progress_percentage = serializers.SerializerMethodField()
    previous_level_completed = serializers.SerializerMethodField()
    required_previous_level = serializers.SerializerMethodField()
    
    class Meta:
        model = CourseLevel
        fields = [
            'id', 'title', 'description', 'difficulty', 'order',
            'cover_image', 'is_active', 'language', 'total_courses',
            'estimated_duration_hours', 'is_enrolled', 'is_completed',
            'progress_percentage', 'previous_level_completed',
            'required_previous_level', 'created_at', 'updated_at'
        ]
    
    def get_total_courses(self, obj):
        return obj.courses.filter(is_active=True).count()
    
    def get_estimated_duration_hours(self, obj):
        return obj.estimated_duration_hours
    
    def get_is_enrolled(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            return LevelEnrollment.objects.filter(
                user=request.user,
                course_level=obj
            ).exists()
        return False
    
    def get_is_completed(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            enrollment = LevelEnrollment.objects.filter(
                user=request.user,
                course_level=obj
            ).first()
            return enrollment.is_completed if enrollment else False
        return False
    
    def get_progress_percentage(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            enrollment = LevelEnrollment.objects.filter(
                user=request.user,
                course_level=obj
            ).first()
            return enrollment.progress_percentage if enrollment else 0
        return 0
    
    def get_previous_level_completed(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated and obj.required_previous_level:
            return LevelEnrollment.objects.filter(
                user=request.user,
                course_level=obj.required_previous_level,
                completed_at__isnull=False
            ).exists()
        return True
    
    def get_required_previous_level(self, obj):
        if obj.required_previous_level:
            return {
                'id': obj.required_previous_level.id,
                'title': obj.required_previous_level.title,
                'difficulty': obj.required_previous_level.difficulty
            }
        return None

from rest_framework import serializers
from .models import Course, CourseEnrollment

class CourseSerializer(serializers.ModelSerializer):
    average_rating = serializers.SerializerMethodField()
    total_lessons = serializers.SerializerMethodField()
    is_enrolled = serializers.SerializerMethodField()
    is_completed = serializers.SerializerMethodField()
    progress_percentage = serializers.SerializerMethodField()
    language = serializers.SerializerMethodField()
    difficulty = serializers.SerializerMethodField()
    
    def get_average_rating(self, obj):
        try:
            return obj.average_rating
        except:
            return 4.5  # Default rating
    
    def get_total_lessons(self, obj):
        try:
            return obj.total_lessons
        except:
            return 0
    
    def get_language(self, obj):
        try:
            if obj.course_level and obj.course_level.language:
                return {
                    'id': obj.course_level.language.id,
                    'name': obj.course_level.language.name,
                    'code': obj.course_level.language.code,
                    'flag_image': obj.course_level.language.flag_image.url if obj.course_level.language.flag_image else None
                }
        except:
            pass
        return None
    
    def get_difficulty(self, obj):
        try:
            return obj.course_level.difficulty if obj.course_level else 'beginner'
        except:
            return 'beginner'
    
    def get_is_enrolled(self, obj):
        user = self.context.get('user')
        if user and user.is_authenticated:
            try:
                if hasattr(obj, 'user_enrollments'):
                    return len(obj.user_enrollments) > 0
                return CourseEnrollment.objects.filter(user=user, course=obj).exists()
            except:
                return False
        return False
    
    def get_is_completed(self, obj):
        user = self.context.get('user')
        if user and user.is_authenticated:
            try:
                if hasattr(obj, 'user_enrollments'):
                    return any(e.is_completed for e in obj.user_enrollments)
                enrollment = CourseEnrollment.objects.filter(user=user, course=obj).first()
                return enrollment.is_completed if enrollment else False
            except:
                return False
        return False
    
    def get_progress_percentage(self, obj):
        user = self.context.get('user')
        if user and user.is_authenticated:
            try:
                if hasattr(obj, 'user_enrollments'):
                    enrollments = obj.user_enrollments
                    return enrollments[0].progress_percentage if enrollments else 0
                enrollment = CourseEnrollment.objects.filter(user=user, course=obj).first()
                return enrollment.progress_percentage if enrollment else 0
            except:
                return 0
        return 0
    
    class Meta:
        model = Course
        fields = [
            'id', 'title', 'description', 'order', 'cover_image', 
            'is_premium', 'is_active', 'estimated_duration', 'xp_reward', 
            'passing_score', 'created_at', 'updated_at',
            'average_rating', 'total_lessons', 'is_enrolled', 'is_completed', 
            'progress_percentage', 'language', 'difficulty'
        ]


class CourseEnrollmentSerializer(serializers.ModelSerializer):
    course = CourseSerializer(read_only=True)
    is_completed = serializers.SerializerMethodField()
    is_passed = serializers.SerializerMethodField()
    
    class Meta:
        model = CourseEnrollment
        fields = [
            'id', 'course', 'enrolled_at', 'completed_at', 
            'progress_percentage', 'best_score', 'attempts_count',
            'is_completed', 'is_passed'
        ]
    
    def get_is_completed(self, obj):
        return obj.is_completed
    
    def get_is_passed(self, obj):
        return obj.is_passed


class LevelEnrollmentSerializer(serializers.ModelSerializer):
    course_level = CourseLevelSerializer(read_only=True)
    current_course = CourseSerializer(read_only=True)
    next_course = serializers.SerializerMethodField()
    is_completed = serializers.SerializerMethodField()
    
    class Meta:
        model = LevelEnrollment
        fields = [
            'id', 'course_level', 'enrolled_at', 'completed_at',
            'progress_percentage', 'current_course', 'next_course',
            'is_completed'
        ]
    
    def get_next_course(self, obj):
        next_course = obj.next_course
        if next_course:
            return {
                'id': next_course.id,
                'title': next_course.title,
                'order': next_course.order
            }
        return None
    
    def get_is_completed(self, obj):
        return obj.is_completed


class CourseRatingSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField(read_only=True)
    user_name = serializers.SerializerMethodField()
    
    class Meta:
        model = CourseRating
        fields = [
            'id', 'user', 'user_name', 'course', 'rating', 
            'review', 'created_at', 'updated_at', 'is_active'
        ]
        read_only_fields = ['id', 'user', 'created_at', 'updated_at']
    
    def get_user_name(self, obj):
        if obj.user.first_name and obj.user.last_name:
            return f"{obj.user.first_name} {obj.user.last_name}"
        return obj.user.username


class CertificateSerializer(serializers.ModelSerializer):
    course_level = CourseLevelSerializer(read_only=True)
    user_name = serializers.SerializerMethodField()
    language = serializers.SerializerMethodField()
    
    class Meta:
        model = Certificate
        fields = [
            'id', 'user_name', 'course_level', 'language',
            'issued_at', 'certificate_id', 'final_score'
        ]
    
    def get_user_name(self, obj):
        return obj.user_name
    
    def get_language(self, obj):
        return {
            'name': obj.course_level.language.name,
            'code': obj.course_level.language.code
        }


class DashboardStatsSerializer(serializers.Serializer):
    current_streak = serializers.IntegerField()
    longest_streak = serializers.IntegerField()
    total_xp = serializers.IntegerField()
    daily_goal = serializers.IntegerField()
    total_courses = serializers.IntegerField()
    completed_courses = serializers.IntegerField()
    recent_activity = serializers.DictField()


class CourseSummarySerializer(serializers.ModelSerializer):
    language = serializers.SerializerMethodField()
    difficulty = serializers.SerializerMethodField()
    
    class Meta:
        model = Course
        fields = [
            'id', 'title', 'description', 'estimated_duration',
            'language', 'difficulty', 'is_premium'
        ]
    
    def get_language(self, obj):
        if obj.course_level and obj.course_level.language:
            return {
                'name': obj.course_level.language.name,
                'code': obj.course_level.language.code
            }
        return None
    
    def get_difficulty(self, obj):
        return obj.course_level.difficulty if obj.course_level else None


class EnrollmentSummarySerializer(serializers.ModelSerializer):
    course = CourseSummarySerializer(read_only=True)
    
    class Meta:
        model = CourseEnrollment
        fields = [
            'id', 'progress_percentage', 'best_score',
            'enrolled_at', 'course'
        ]
