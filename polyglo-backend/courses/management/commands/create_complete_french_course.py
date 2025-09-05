from django.core.management.base import BaseCommand
from courses.models import Language, Course, CourseLevel
from lessons.models import Lesson
from quizzes.models import Quiz, QuizQuestion

class Command(BaseCommand):
    help = 'Create one complete French beginner course'

    def handle(self, *args, **options):
        self.stdout.write('🇫🇷 Creating complete French beginner course...')
        
        # Get French language
        french_language = Language.objects.get(code='fr')
        
        # Get or create course level
        course_level, created = CourseLevel.objects.get_or_create(
            language=french_language,
            difficulty='beginner',
            defaults={
                'name': 'French Beginner A1',
                'description': 'Complete French course for absolute beginners'
            }
        )
        
        # Delete existing beginner courses
        Course.objects.filter(course_level=course_level).delete()
        self.stdout.write('🗑️ Removed existing courses')
        
        # Create THE main French beginner course
        course = Course.objects.create(
            title='French for Absolute Beginners',
            course_level=course_level,
            description='Complete interactive French course with lessons, quizzes, and practice exercises',
            is_active=True,
            passing_score=70,
            estimated_duration=240,  # 4 hours
            xp_reward=200,
            order=1
        )
        
        self.stdout.write(f'✅ Created main course: {course.title}')
        
        # Add all lessons and quizzes to this one course
        self.create_complete_content(course)
        
        self.stdout.write(self.style.SUCCESS('🎉 Complete French beginner course created!'))
    
    def create_complete_content(self, course):
        # Interactive lessons
        lessons_data = [
            {
                'title': 'Lesson 1: French Greetings',
                'lesson_type': 'interactive',
                'order': 1,
                'content': '''
                <div class="interactive-lesson">
                    <h2>🇫🇷 French Greetings</h2>
                    <div class="lesson-section">
                        <h3>📚 Essential Vocabulary</h3>
                        <div class="vocabulary-grid">
                            <div class="vocab-item"><strong>Bonjour</strong> [bon-ZHOOR] - Hello (formal)</div>
                            <div class="vocab-item"><strong>Salut</strong> [sah-LU] - Hi (informal)</div>
                            <div class="vocab-item"><strong>Au revoir</strong> [oh ruh-VWAHR] - Goodbye</div>
                            <div class="vocab-item"><strong>Merci</strong> [mer-SEE] - Thank you</div>
                        </div>
                    </div>
                    
                    <div class="interactive-question" data-type="multiple-choice" data-question-id="1">
                        <h4>💡 Practice Question</h4>
                        <p><strong>How do you say "Hello" formally in French?</strong></p>
                        <div class="question-options">
                            <button class="option-btn" data-value="bonjour">Bonjour</button>
                            <button class="option-btn" data-value="salut">Salut</button>
                            <button class="option-btn" data-value="merci">Merci</button>
                        </div>
                        <div class="question-feedback" style="display: none;">
                            <div class="correct-feedback">✅ Correct! "Bonjour" is the formal greeting.</div>
                            <div class="incorrect-feedback">❌ Try "Bonjour" for formal greetings.</div>
                        </div>
                        <input type="hidden" class="correct-answer" value="bonjour">
                    </div>
                </div>
                ''',
                'duration_minutes': 15,
                'xp_reward': 25,
                'is_active': True,
                'description': 'Learn essential French greetings'
            },
            {
                'title': 'Lesson 2: French Numbers 1-10',
                'lesson_type': 'interactive',
                'order': 2,
                'content': '''
                <div class="interactive-lesson">
                    <h2>🔢 French Numbers</h2>
                    <div class="lesson-section">
                        <h3>📚 Numbers 1-10</h3>
                        <div class="numbers-grid">
                            <div class="number-card">1 - <strong>un</strong> [uhn]</div>
                            <div class="number-card">2 - <strong>deux</strong> [duh]</div>
                            <div class="number-card">3 - <strong>trois</strong> [twah]</div>
                            <div class="number-card">4 - <strong>quatre</strong> [KAH-truh]</div>
                            <div class="number-card">5 - <strong>cinq</strong> [sank]</div>
                        </div>
                    </div>
                    
                    <div class="interactive-question" data-type="multiple-choice" data-question-id="2">
                        <h4>💡 Practice Question</h4>
                        <p><strong>How do you say "five" in French?</strong></p>
                        <div class="question-options">
                            <button class="option-btn" data-value="quatre">quatre</button>
                            <button class="option-btn" data-value="cinq">cinq</button>
                            <button class="option-btn" data-value="six">six</button>
                        </div>
                        <div class="question-feedback" style="display: none;">
                            <div class="correct-feedback">✅ Perfect! "cinq" is five.</div>
                            <div class="incorrect-feedback">❌ The answer is "cinq".</div>
                        </div>
                        <input type="hidden" class="correct-answer" value="cinq">
                    </div>
                </div>
                ''',
                'duration_minutes': 20,
                'xp_reward': 30,
                'is_active': True,
                'description': 'Master French numbers 1-10'
            },
            {
                'title': 'Lesson 3: French Family',
                'lesson_type': 'interactive',
                'order': 3,
                'content': '''
                <div class="interactive-lesson">
                    <h2>👨‍��‍👧‍👦 French Family</h2>
                    <div class="lesson-section">
                        <h3>📚 Family Members</h3>
                        <div class="family-vocab">
                            <div class="family-item"><strong>le père</strong> - father</div>
                            <div class="family-item"><strong>la mère</strong> - mother</div>
                            <div class="family-item"><strong>le frère</strong> - brother</div>
                            <div class="family-item"><strong>la sœur</strong> - sister</div>
                        </div>
                    </div>
                    
                    <div class="interactive-question" data-type="multiple-choice" data-question-id="3">
                        <h4>💡 Practice Question</h4>
                        <p><strong>How do you say "sister" in French?</strong></p>
                        <div class="question-options">
                            <button class="option-btn" data-value="la_soeur">la sœur</button>
                            <button class="option-btn" data-value="le_frere">le frère</button>
                            <button class="option-btn" data-value="la_mere">la mère</button>
                        </div>
                        <div class="question-feedback" style="display: none;">
                            <div class="correct-feedback">✅ Excellent! "la sœur" means sister.</div>
                            <div class="incorrect-feedback">❌ The answer is "la sœur".</div>
                        </div>
                        <input type="hidden" class="correct-answer" value="la_soeur">
                    </div>
                </div>
                ''',
                'duration_minutes': 18,
                'xp_reward': 28,
                'is_active': True,
                'description': 'Learn French family vocabulary'
            }
        ]
        
        for lesson_data in lessons_data:
            lesson = Lesson.objects.create(
                course=course,
                **lesson_data
            )
            self.stdout.write(f'  ✅ Added lesson: {lesson.title}')
        
        # Add a comprehensive quiz
        quiz = Quiz.objects.create(
            title='French Beginner Quiz',
            course=course,
            time_limit_minutes=10,
            passing_score=70,
            max_attempts=3,
            xp_reward=50
        )
        
        # Add quiz questions
        questions = [
            {
                'question_type': 'multiple_choice',
                'question_text': 'How do you say "Hello" in French?',
                'options': [
                    {'text': 'Bonjour', 'value': 'bonjour'},
                    {'text': 'Au revoir', 'value': 'au_revoir'},
                    {'text': 'Merci', 'value': 'merci'}
                ],
                'correct_answer': 'bonjour',
                'explanation': 'Bonjour means Hello in French.',
                'points': 10,
                'order': 1
            },
            {
                'question_type': 'multiple_choice',
                'question_text': 'What is "five" in French?',
                'options': [
                    {'text': 'quatre', 'value': 'quatre'},
                    {'text': 'cinq', 'value': 'cinq'},
                    {'text': 'six', 'value': 'six'}
                ],
                'correct_answer': 'cinq',
                'explanation': 'Cinq is five in French.',
                'points': 10,
                'order': 2
            },
            {
                'question_type': 'true_false',
                'question_text': '"La sœur" means sister in French.',
                'correct_answer': 'true',
                'explanation': 'Yes, "la sœur" means sister.',
                'points': 10,
                'order': 3
            }
        ]
        
        for question_data in questions:
            QuizQuestion.objects.create(
                quiz=quiz,
                **question_data
            )
        
        self.stdout.write(f'  ✅ Added quiz with {len(questions)} questions')
