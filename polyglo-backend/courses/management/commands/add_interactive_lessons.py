from django.core.management.base import BaseCommand
from courses.models import Language, Course, CourseLevel
from lessons.models import Lesson

class Command(BaseCommand):
    help = 'Add interactive French lessons with embedded questions'

    def handle(self, *args, **options):
        self.stdout.write('🇫🇷 Adding interactive French lessons...')
        
        # Get French language
        try:
            french_language = Language.objects.get(code='fr')
            self.stdout.write('✅ Found French language')
        except Language.DoesNotExist:
            self.stdout.write('❌ French language not found')
            return
        
        # Get existing French course or create one
        course_level, created = CourseLevel.objects.get_or_create(
            language=french_language,
            difficulty='beginner',
            defaults={
                'name': 'French Beginner A1',
                'description': 'Basic French for absolute beginners'
            }
        )
        
        course, created = Course.objects.get_or_create(
            title='Interactive French Learning',
            course_level=course_level,
            defaults={
                'description': 'Interactive French lessons with embedded questions',
                'is_active': True,
                'passing_score': 70,
                'estimated_duration': 180,
                'xp_reward': 150,
                'order': 1
            }
        )
        
        if created:
            self.stdout.write(f'✅ Created course: {course.title}')
        
        # Create interactive lessons
        self.create_interactive_lessons(course)
        
        self.stdout.write(self.style.SUCCESS('🎉 Interactive French lessons added!'))
    
    def create_interactive_lessons(self, course):
        lessons_data = [
            {
                'title': 'French Greetings - Interactive',
                'lesson_type': 'interactive',
                'order': 1,
                'content': '''
                <div class="interactive-lesson">
                    <h2>🇫🇷 French Greetings</h2>
                    
                    <div class="lesson-section">
                        <h3>📚 Essential Vocabulary</h3>
                        <div class="vocabulary-grid">
                            <div class="vocab-item">
                                <strong>Bonjour</strong> [bon-ZHOOR]<br>
                                <em>Hello (formal, daytime)</em>
                            </div>
                            <div class="vocab-item">
                                <strong>Bonsoir</strong> [bon-SWAHR]<br>
                                <em>Good evening</em>
                            </div>
                            <div class="vocab-item">
                                <strong>Salut</strong> [sah-LU]<br>
                                <em>Hi/Bye (informal)</em>
                            </div>
                            <div class="vocab-item">
                                <strong>Au revoir</strong> [oh ruh-VWAHR]<br>
                                <em>Goodbye</em>
                            </div>
                            <div class="vocab-item">
                                <strong>Merci</strong> [mer-SEE]<br>
                                <em>Thank you</em>
                            </div>
                            <div class="vocab-item">
                                <strong>De rien</strong> [duh ree-AHN]<br>
                                <em>You're welcome</em>
                            </div>
                        </div>
                    </div>

                    <div class="interactive-question" data-type="multiple-choice" data-question-id="1">
                        <h4>💡 Practice Question 1</h4>
                        <p><strong>How do you say "Hello" formally during the day in French?</strong></p>
                        <div class="question-options">
                            <button class="option-btn" data-value="bonjour">Bonjour</button>
                            <button class="option-btn" data-value="salut">Salut</button>
                            <button class="option-btn" data-value="bonsoir">Bonsoir</button>
                            <button class="option-btn" data-value="au_revoir">Au revoir</button>
                        </div>
                        <div class="question-feedback" style="display: none;">
                            <div class="correct-feedback">✅ Correct! "Bonjour" is the formal greeting used during the day.</div>
                            <div class="incorrect-feedback">❌ Not quite. Try again! "Bonjour" is the formal daytime greeting.</div>
                        </div>
                        <input type="hidden" class="correct-answer" value="bonjour">
                    </div>

                    <div class="lesson-section">
                        <h3>🗣️ Sample Dialogue</h3>
                        <div class="dialogue-box">
                            <p><strong>Marie:</strong> Bonjour Pierre! Comment allez-vous?</p>
                            <p><strong>Pierre:</strong> Bonjour Marie! Je vais bien, merci. Et vous?</p>
                            <p><strong>Marie:</strong> Très bien, merci beaucoup!</p>
                            <p><em>Translation:</em></p>
                            <p><em>Marie: Hello Pierre! How are you?</em></p>
                            <p><em>Pierre: Hello Marie! I'm doing well, thank you. And you?</em></p>
                            <p><em>Marie: Very well, thank you very much!</em></p>
                        </div>
                    </div>

                    <div class="interactive-question" data-type="true-false" data-question-id="2">
                        <h4>💡 Practice Question 2</h4>
                        <p><strong>"Salut" can be used for both hello and goodbye informally.</strong></p>
                        <div class="question-options">
                            <button class="option-btn" data-value="true">True</button>
                            <button class="option-btn" data-value="false">False</button>
                        </div>
                        <div class="question-feedback" style="display: none;">
                            <div class="correct-feedback">✅ Correct! "Salut" is versatile and works for both greetings.</div>
                            <div class="incorrect-feedback">❌ Actually, "Salut" can be used for both hello and goodbye!</div>
                        </div>
                        <input type="hidden" class="correct-answer" value="true">
                    </div>

                    <div class="interactive-question" data-type="fill-blank" data-question-id="3">
                        <h4>💡 Practice Question 3</h4>
                        <p><strong>Complete the greeting: "_____, Pierre! Comment allez-vous?"</strong></p>
                        <div class="question-options">
                            <input type="text" class="fill-blank-input" placeholder="Type your answer...">
                            <button class="check-answer-btn">Check Answer</button>
                        </div>
                        <div class="question-feedback" style="display: none;">
                            <div class="correct-feedback">✅ Excellent! "Bonjour" is the correct formal greeting.</div>
                            <div class="incorrect-feedback">❌ The answer is "Bonjour" - the formal daytime greeting.</div>
                        </div>
                        <input type="hidden" class="correct-answer" value="bonjour">
                    </div>

                    <div class="lesson-completion">
                        <h3>🎯 Lesson Summary</h3>
                        <ul>
                            <li>Use <strong>Bonjour</strong> for formal daytime greetings</li>
                            <li><strong>Bonsoir</strong> for evening greetings</li>
                            <li><strong>Salut</strong> for informal hello/goodbye</li>
                            <li>Always respond politely to "Comment allez-vous?"</li>
                        </ul>
                        <div class="lesson-complete-btn">
                            <button class="complete-lesson-btn" data-lesson-id="greetings">Complete Lesson (+25 XP)</button>
                        </div>
                    </div>
                </div>
                ''',
                'duration_minutes': 20,
                'xp_reward': 25,
                'is_active': True,
                'description': 'Learn essential French greetings with interactive exercises'
            },
            {
                'title': 'French Numbers 1-10 - Interactive',
                'lesson_type': 'interactive',
                'order': 2,
                'content': '''
                <div class="interactive-lesson">
                    <h2>🔢 French Numbers 1-10</h2>
                    
                    <div class="lesson-section">
                        <h3>📚 Learn the Numbers</h3>
                        <div class="numbers-grid">
                            <div class="number-card" data-audio="un">1 - <strong>un</strong> [uhn]</div>
                            <div class="number-card" data-audio="deux">2 - <strong>deux</strong> [duh]</div>
                            <div class="number-card" data-audio="trois">3 - <strong>trois</strong> [twah]</div>
                            <div class="number-card" data-audio="quatre">4 - <strong>quatre</strong> [KAH-truh]</div>
                            <div class="number-card" data-audio="cinq">5 - <strong>cinq</strong> [sank]</div>
                            <div class="number-card" data-audio="six">6 - <strong>six</strong> [sees]</div>
                            <div class="number-card" data-audio="sept">7 - <strong>sept</strong> [set]</div>
                            <div class="number-card" data-audio="huit">8 - <strong>huit</strong> [weet]</div>
                            <div class="number-card" data-audio="neuf">9 - <strong>neuf</strong> [nuhf]</div>
                            <div class="number-card" data-audio="dix">10 - <strong>dix</strong> [dees]</div>
                        </div>
                        <p class="tip">💡 Click on each number to hear the pronunciation!</p>
                    </div>

                    <div class="interactive-question" data-type="multiple-choice" data-question-id="4">
                        <h4>💡 Practice Question 1</h4>
                        <p><strong>How do you say "five" in French?</strong></p>
                        <div class="question-options">
                            <button class="option-btn" data-value="quatre">quatre</button>
                            <button class="option-btn" data-value="cinq">cinq</button>
                            <button class="option-btn" data-value="six">six</button>
                            <button class="option-btn" data-value="sept">sept</button>
                        </div>
                        <div class="question-feedback" style="display: none;">
                            <div class="correct-feedback">✅ Perfect! "cinq" is five in French.</div>
                            <div class="incorrect-feedback">❌ Try again! The answer is "cinq".</div>
                        </div>
                        <input type="hidden" class="correct-answer" value="cinq">
                    </div>

                    <div class="lesson-section">
                        <h3>🎭 Practice Sentences</h3>
                        <div class="example-sentences">
                            <p>• J'ai <strong>trois</strong> chats. <em>(I have three cats.)</em></p>
                            <p>• Il y a <strong>sept</strong> jours dans une semaine. <em>(There are seven days in a week.)</em></p>
                            <p>• Elle a <strong>dix</strong> euros. <em>(She has ten euros.)</em></p>
                            <p>• Nous sommes <strong>cinq</strong> dans ma famille. <em>(We are five in my family.)</em></p>
                        </div>
                    </div>

                    <div class="interactive-question" data-type="number-match" data-question-id="5">
                        <h4>💡 Practice Question 2</h4>
                        <p><strong>Match the numbers: Click the French number that equals the digit shown</strong></p>
                        <div class="number-matching-game">
                            <div class="target-number">7</div>
                            <div class="french-options">
                                <button class="french-number" data-value="six">six</button>
                                <button class="french-number" data-value="sept">sept</button>
                                <button class="french-number" data-value="huit">huit</button>
                            </div>
                        </div>
                        <div class="question-feedback" style="display: none;">
                            <div class="correct-feedback">✅ Excellent! Sept = 7</div>
                            <div class="incorrect-feedback">❌ Try again! 7 = sept in French</div>
                        </div>
                        <input type="hidden" class="correct-answer" value="sept">
                    </div>

                    <div class="interactive-question" data-type="fill-blank" data-question-id="6">
                        <h4>💡 Practice Question 3</h4>
                        <p><strong>Complete: "J'ai _____ euros" (I have eight euros)</strong></p>
                        <div class="question-options">
                            <input type="text" class="fill-blank-input" placeholder="Type the French number...">
                            <button class="check-answer-btn">Check Answer</button>
                        </div>
                        <div class="question-feedback" style="display: none;">
                            <div class="correct-feedback">✅ Great! "huit" means eight in French.</div>
                            <div class="incorrect-feedback">❌ The answer is "huit" (eight).</div>
                        </div>
                        <input type="hidden" class="correct-answer" value="huit">
                    </div>

                    <div class="lesson-completion">
                        <h3>🎯 Lesson Summary</h3>
                        <p>You've learned French numbers 1-10! Practice counting in French:</p>
                        <div class="number-sequence">
                            un, deux, trois, quatre, cinq, six, sept, huit, neuf, dix
                        </div>
                        <div class="lesson-complete-btn">
                            <button class="complete-lesson-btn" data-lesson-id="numbers">Complete Lesson (+30 XP)</button>
                        </div>
                    </div>
                </div>
                ''',
                'duration_minutes': 25,
                'xp_reward': 30,
                'is_active': True,
                'description': 'Master French numbers 1-10 with interactive practice'
            },
            {
                'title': 'French Family Vocabulary - Interactive',
                'lesson_type': 'interactive',
                'order': 3,
                'content': '''
                <div class="interactive-lesson">
                    <h2>👨‍👩‍👧‍👦 French Family Vocabulary</h2>
                    
                    <div class="lesson-section">
                        <h3>📚 Family Members</h3>
                        <div class="family-vocab">
                            <div class="family-item">
                                <strong>la famille</strong> [lah fah-MEEL] - <em>family</em>
                            </div>
                            <div class="family-item">
                                <strong>le père / papa</strong> [luh pehr / pah-PAH] - <em>father / dad</em>
                            </div>
                            <div class="family-item">
                                <strong>la mère / maman</strong> [lah mehr / mah-MAHN] - <em>mother / mom</em>
                            </div>
                            <div class="family-item">
                                <strong>le fils</strong> [luh fees] - <em>son</em>
                            </div>
                            <div class="family-item">
                                <strong>la fille</strong> [lah fee] - <em>daughter</em>
                            </div>
                            <div class="family-item">
                                <strong>le frère</strong> [luh frehr] - <em>brother</em>
                            </div>
                            <div class="family-item">
                                <strong>la sœur</strong> [lah suhr] - <em>sister</em>
                            </div>
                            <div class="family-item">
                                <strong>les parents</strong> [lay pah-RAHN] - <em>parents</em>
                            </div>
                        </div>
                    </div>

                    <div class="interactive-question" data-type="multiple-choice" data-question-id="7">
                        <h4>💡 Practice Question 1</h4>
                        <p><strong>How do you say "sister" in French?</strong></p>
                        <div class="question-options">
                            <button class="option-btn" data-value="la_soeur">la sœur</button>
                            <button class="option-btn" data-value="le_frere">le frère</button>
                            <button class="option-btn" data-value="la_fille">la fille</button>
                            <button class="option-btn" data-value="la_mere">la mère</button>
                        </div>
                        <div class="question-feedback" style="display: none;">
                            <div class="correct-feedback">✅ Excellent! "la sœur" means sister.</div>
                            <div class="incorrect-feedback">❌ The correct answer is "la sœur" (sister).</div>
                        </div>
                        <input type="hidden" class="correct-answer" value="la_soeur">
                    </div>

                    <div class="lesson-section">
                        <h3>🗣️ Example Sentences</h3>
                        <div class="example-box">
                            <p>• Voici ma <strong>famille</strong>. <em>(Here is my family.)</em></p>
                            <p>• Mon <strong>père</strong> s'appelle Jean. <em>(My father's name is Jean.)</em></p>
                            <p>• J'ai une <strong>sœur</strong> et deux <strong>frères</strong>. <em>(I have one sister and two brothers.)</em></p>
                            <p>• Ma <strong>mère</strong> est professeure. <em>(My mother is a teacher.)</em></p>
                            <p>• Mes <strong>parents</strong> sont très gentils. <em>(My parents are very kind.)</em></p>
                        </div>
                    </div>

                    <div class="interactive-question" data-type="true-false" data-question-id="8">
                        <h4>�� Practice Question 2</h4>
                        <p><strong>"Le fils" means "daughter" in French.</strong></p>
                        <div class="question-options">
                            <button class="option-btn" data-value="true">True</button>
                            <button class="option-btn" data-value="false">False</button>
                        </div>
                        <div class="question-feedback" style="display: none;">
                            <div class="correct-feedback">✅ Correct! "Le fils" means "son", not "daughter".</div>
                            <div class="incorrect-feedback">❌ "Le fils" means "son". "La fille" means "daughter".</div>
                        </div>
                        <input type="hidden" class="correct-answer" value="false">
                    </div>

                    <div class="interactive-question" data-type="fill-blank" data-question-id="9">
                        <h4>💡 Practice Question 3</h4>
                        <p><strong>Complete: "Ma _____ s'appelle Marie." (My mother's name is Marie.)</strong></p>
                        <div class="question-options">
                            <input type="text" class="fill-blank-input" placeholder="Type your answer...">
                            <button class="check-answer-btn">Check Answer</button>
                        </div>
                        <div class="question-feedback" style="display: none;">
                            <div class="correct-feedback">✅ Perfect! "mère" means mother.</div>
                            <div class="incorrect-feedback">❌ The answer is "mère" (mother).</div>
                        </div>
                        <input type="hidden" class="correct-answer" value="mère">
                    </div>

                    <div class="lesson-completion">
                        <h3>🎯 Lesson Summary</h3>
                        <p>Great job! You've learned essential family vocabulary in French:</p>
                        <div class="family-summary">
                            <p><strong>Remember the articles:</strong> <em>le</em> (masculine), <em>la</em> (feminine), <em>les</em> (plural)</p>
                        </div>
                        <div class="lesson-complete-btn">
                            <button class="complete-lesson-btn" data-lesson-id="family">Complete Lesson (+35 XP)</button>
                        </div>
                    </div>
                </div>
                ''',
                'duration_minutes': 22,
                'xp_reward': 35,
                'is_active': True,
                'description': 'Learn French family vocabulary with interactive exercises'
            }
        ]
        
        for lesson_data in lessons_data:
            lesson, created = Lesson.objects.get_or_create(
                course=course,
                title=lesson_data['title'],
                defaults=lesson_data
            )
            if created:
                self.stdout.write(f'  ✅ Added interactive lesson: {lesson.title}')
            else:
                self.stdout.write(f'  ℹ️ Lesson exists: {lesson.title}')
