from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from courses.models import Language, Course
from lessons.models import Lesson

User = get_user_model()

class Command(BaseCommand):
    help = 'Create sample data for development'

    def handle(self, *args, **options):
        # Create languages
        languages_data = [
            {'name': 'Spanish', 'code': 'es'},
            {'name': 'French', 'code': 'fr'},
            {'name': 'German', 'code': 'de'},
            {'name': 'Italian', 'code': 'it'},
            {'name': 'Portuguese', 'code': 'pt'},
        ]

        for lang_data in languages_data:
            language, created = Language.objects.get_or_create(**lang_data)
            if created:
                self.stdout.write(f'Created language: {language.name}')

        # Create sample instructor (use your superuser or create one)
        instructor, created = User.objects.get_or_create(
            email='instructor@example.com',
            defaults={
                'username': 'instructor',
                'first_name': 'Sample',
                'last_name': 'Instructor'
            }
        )
        if created:
            instructor.set_password('password123')
            instructor.save()

        # Create sample courses
        spanish = Language.objects.get(code='es')
        french = Language.objects.get(code='fr')
        german = Language.objects.get(code='de')

        courses_data = [
            {
                'title': 'Spanish for Beginners',
                'description': 'Learn basic Spanish vocabulary and grammar with interactive lessons and real-world examples.',
                'language': spanish,
                'difficulty': 'beginner',
                'instructor': instructor,
                'total_lessons': 10,
                'average_rating': 4.5,
                'total_ratings': 150,
                'tags': ['beginner', 'vocabulary', 'grammar'],
                'is_active': True
            },
            {
                'title': 'Intermediate Spanish Conversation',
                'description': 'Advance your Spanish skills with complex conversations and cultural insights.',
                'language': spanish,
                'difficulty': 'intermediate',
                'instructor': instructor,
                'total_lessons': 15,
                'average_rating': 4.7,
                'total_ratings': 89,
                'tags': ['intermediate', 'conversation', 'culture'],
                'is_active': True
            },
            {
                'title': 'French Essentials',
                'description': 'Master French pronunciation and basic conversation skills.',
                'language': french,
                'difficulty': 'beginner',
                'instructor': instructor,
                'total_lessons': 12,
                'average_rating': 4.3,
                'total_ratings': 234,
                'tags': ['beginner', 'pronunciation', 'basics'],
                'is_active': True
            },
            {
                'title': 'German Grammar Mastery',
                'description': 'Comprehensive guide to German grammar with practical exercises.',
                'language': german,
                'difficulty': 'intermediate',
                'instructor': instructor,
                'total_lessons': 18,
                'average_rating': 4.6,
                'total_ratings': 67,
                'tags': ['intermediate', 'grammar', 'exercises'],
                'is_active': True
            },
            {
                'title': 'Advanced Spanish Literature',
                'description': 'Explore Spanish literature and advanced language concepts.',
                'language': spanish,
                'difficulty': 'advanced',
                'instructor': instructor,
                'total_lessons': 20,
                'average_rating': 4.8,
                'total_ratings': 45,
                'tags': ['advanced', 'literature', 'culture'],
                'is_premium': True,
                'price': 29.99,
                'is_active': True
            }
        ]

        for course_data in courses_data:
            course, created = Course.objects.get_or_create(
                title=course_data['title'],
                defaults=course_data
            )
            if created:
                self.stdout.write(f'Created course: {course.title}')
                
                # Create sample lessons for each course
                for i in range(1, min(6, course_data['total_lessons'] + 1)):
                    Lesson.objects.get_or_create(
                        course=course,
                        order=i,
                        defaults={
                            'title': f'Lesson {i}: {course.title.split()[0]} Basics',
                            'description': f'This is lesson {i} covering fundamental concepts.',
                            'lesson_type': 'text',
                            'content': f'Welcome to lesson {i}!\n\nIn this lesson, you will learn:\n- Key vocabulary\n- Important grammar rules\n- Practical examples\n\nLet\'s get started!',
                            'duration_minutes': 15,
                            'xp_reward': 10
                        }
                    )

        self.stdout.write(self.style.SUCCESS('Sample data created successfully!'))
        self.stdout.write(f'Created {Course.objects.count()} courses total')