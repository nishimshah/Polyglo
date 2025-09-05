from django.core.management.base import BaseCommand
from courses.models import Language, Course, CourseLevel
from lessons.models import Lesson
from quizzes.models import Quiz, QuizQuestion

class Command(BaseCommand):
    help = 'Seed French language learning data'

    def handle(self, *args, **options):
        self.stdout.write('🇫�� Starting French data seeding...')
        
        # Get existing French language
        try:
            french_language = Language.objects.get(code='fr')
            self.stdout.write('✅ Found French language')
        except Language.DoesNotExist:
            self.stdout.write('❌ French language not found')
            return
        
        # Get or create a course level for French
        course_level, created = CourseLevel.objects.get_or_create(
            language=french_language,
            difficulty='beginner',
            defaults={
                'name': 'French Beginner A1',
                'description': 'Basic French for absolute beginners'
            }
        )
        
        if created:
            self.stdout.write(f'✅ Created course level: {course_level}')
        
        # Create a course using the course_level
        course, created = Course.objects.get_or_create(
            title='French Basics - Quiz Ready',
            course_level=course_level,
            defaults={
                'description': 'Basic French with working quizzes and lessons',
                'is_active': True,
                'passing_score': 70,
                'estimated_duration': 120,  # minutes
                'xp_reward': 100,
                'order': 1
            }
        )
        
        if created:
            self.stdout.write(f'✅ Created course: {course.title}')
            self.create_simple_lesson(course)
            self.create_simple_quiz(course)
        else:
            self.stdout.write(f'ℹ️ Course exists: {course.title}')
        
        self.stdout.write(self.style.SUCCESS('🎉 French data seeding completed!'))
    
    def create_simple_lesson(self, course):
        lesson, created = Lesson.objects.get_or_create(
            course=course,
            title='French Greetings Basics',
            defaults={
                'order': 1,
                'content': '''
                <h2>Basic French Greetings</h2>
                <div class="vocabulary-section">
                    <h3>Essential Greetings:</h3>
                    <ul>
                        <li><strong>Bonjour</strong> - Hello (formal, daytime)</li>
                        <li><strong>Bonsoir</strong> - Good evening</li>
                        <li><strong>Salut</strong> - Hi/Bye (informal)</li>
                        <li><strong>Au revoir</strong> - Goodbye</li>
                        <li><strong>Merci</strong> - Thank you</li>
                        <li><strong>De rien</strong> - You're welcome</li>
                    </ul>
                </div>
                <div class="practice-section">
                    <h3>Practice Dialogue:</h3>
                    <p><strong>Person A:</strong> Bonjour! Comment allez-vous?</p>
                    <p><strong>Person B:</strong> Bonjour! Je vais bien, merci. Et vous?</p>
                    <p><strong>Person A:</strong> Très bien, merci!</p>
                </div>
                ''',
                'duration_minutes': 15,
                'xp_reward': 25,
                'is_active': True
            }
        )
        if created:
            self.stdout.write(f'  ✅ Added lesson: {lesson.title}')
    
    def create_simple_quiz(self, course):
        quiz, created = Quiz.objects.get_or_create(
            title='French Greetings Quiz',
            course=course,
            defaults={
                'time_limit_minutes': 8,
                'passing_score': 70,
                'max_attempts': 3,
                'xp_reward': 30
            }
        )
        
        if created:
            self.stdout.write(f'  ✅ Created quiz: {quiz.title}')
            
            # Add multiple choice question
            QuizQuestion.objects.create(
                quiz=quiz,
                question_type='multiple_choice',
                question_text='How do you say "Hello" formally during the day in French?',
                options=[
                    {'text': 'Bonjour', 'value': 'bonjour'},
                    {'text': 'Bonsoir', 'value': 'bonsoir'},
                    {'text': 'Au revoir', 'value': 'au_revoir'},
                    {'text': 'Salut', 'value': 'salut'}
                ],
                correct_answer='bonjour',
                explanation='Bonjour is the formal greeting used during the day in French.',
                points=10,
                order=1
            )
            
            # Add true/false question
            QuizQuestion.objects.create(
                quiz=quiz,
                question_type='true_false',
                question_text='Au revoir means Goodbye in French.',
                correct_answer='true',
                explanation='Yes, Au revoir means Goodbye in French.',
                points=10,
                order=2
            )
            
            # Add another multiple choice question
            QuizQuestion.objects.create(
                quiz=quiz,
                question_type='multiple_choice',
                question_text='Which greeting can be used both for hello and goodbye informally?',
                options=[
                    {'text': 'Bonjour', 'value': 'bonjour'},
                    {'text': 'Salut', 'value': 'salut'},
                    {'text': 'Bonsoir', 'value': 'bonsoir'},
                    {'text': 'Merci', 'value': 'merci'}
                ],
                correct_answer='salut',
                explanation='Salut is an informal greeting that can be used for both hello and goodbye.',
                points=10,
                order=3
            )
            
            self.stdout.write('  ✅ Added 3 quiz questions')
