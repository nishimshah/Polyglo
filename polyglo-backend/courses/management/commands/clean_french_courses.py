from django.core.management.base import BaseCommand
from courses.models import Language, Course, CourseLevel
from lessons.models import Lesson

class Command(BaseCommand):
    help = 'Clean up French courses and keep only our interactive ones'

    def handle(self, *args, **options):
        self.stdout.write('🧹 Cleaning up French courses...')
        
        # Get French language
        try:
            french_language = Language.objects.get(code='fr')
            self.stdout.write('✅ Found French language')
        except Language.DoesNotExist:
            self.stdout.write('❌ French language not found')
            return
        
        # Get course level
        course_level = CourseLevel.objects.filter(
            language=french_language,
            difficulty='beginner'
        ).first()
        
        if not course_level:
            self.stdout.write('❌ No French beginner course level found')
            return
        
        # Remove old French beginner courses (keep only our interactive ones)
        old_courses = Course.objects.filter(
            course_level=course_level
        ).exclude(
            title__in=['Interactive French Learning', 'French Basics - Quiz Ready']
        )
        
        deleted_count = old_courses.count()
        old_courses.delete()
        self.stdout.write(f'🗑️ Removed {deleted_count} old French beginner courses')
        
        # Update our interactive course to be the main beginner course
        interactive_course = Course.objects.filter(
            title='Interactive French Learning',
            course_level=course_level
        ).first()
        
        if interactive_course:
            interactive_course.title = 'French for Absolute Beginners'
            interactive_course.description = 'Complete French beginner course with interactive lessons and quizzes'
            interactive_course.order = 1
            interactive_course.save()
            self.stdout.write(f'✅ Updated main course: {interactive_course.title}')
        
        # Check final course count
        remaining_courses = Course.objects.filter(course_level=course_level)
        self.stdout.write(f'📊 Remaining French beginner courses: {remaining_courses.count()}')
        for course in remaining_courses:
            self.stdout.write(f'   - {course.title} ({course.lessons.count()} lessons)')
        
        self.stdout.write(self.style.SUCCESS('🎉 French course cleanup completed!'))
