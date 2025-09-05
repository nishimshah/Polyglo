from django.core.management.base import BaseCommand
from courses.models import Language, CourseLevel, Course 
from lessons.models import Lesson,Content

class Command(BaseCommand):
    help = 'Populate database with comprehensive Duolingo-style course structure for all languages'

    def handle(self, *args, **options):
        self.stdout.write('Creating comprehensive language course structure...')
        
        self.create_spanish_structure()
        self.create_french_structure() 
        self.create_german_structure()
        self.create_italian_structure()
        self.create_japanese_structure()
        self.create_portuguese_structure()
        
        self.stdout.write(self.style.SUCCESS('Successfully created comprehensive Duolingo-style course structure!'))

    def create_spanish_structure(self):
        """Create comprehensive Spanish course structure"""
        # Create Spanish language
        spanish, _ = Language.objects.get_or_create(
            code='es',
            defaults={
                'name': 'Spanish',
                'description': 'Learn Spanish, the second most spoken language in the world',
                'is_active': True
            }
        )

        # Create Beginner Level
        beginner_level, _ = CourseLevel.objects.get_or_create(
            language=spanish,
            difficulty='beginner',
            defaults={
                'title': 'Spanish Beginner',
                'description': 'Start your Spanish journey with essential vocabulary and basic grammar',
                'order': 1,
                'is_active': True
            }
        )

        # Create Intermediate Level
        intermediate_level, _ = CourseLevel.objects.get_or_create(
            language=spanish,
            difficulty='intermediate',
            defaults={
                'title': 'Spanish Intermediate',
                'description': 'Build conversational skills and expand your Spanish vocabulary',
                'order': 2,
                'required_previous_level': beginner_level,
                'is_active': True
            }
        )

        # Create Advanced Level
        advanced_level, _ = CourseLevel.objects.get_or_create(
            language=spanish,
            difficulty='advanced',
            defaults={
                'title': 'Spanish Advanced',
                'description': 'Master complex grammar and achieve fluency in Spanish',
                'order': 3,
                'required_previous_level': intermediate_level,
                'is_active': True
            }
        )

        # Beginner Spanish Courses
        beginner_courses = [
            {
                'title': 'Spanish Basics',
                'description': 'Learn essential greetings, numbers, and basic vocabulary to start communicating',
                'order': 1,
                'lessons': [
                    {
                        'title': 'Basic Greetings',
                        'content': 'Learn how to greet people and introduce yourself in Spanish. Master essential phrases like "Hola", "Buenos días", "¿Cómo te llamas?" and "Me llamo..."',
                        'vocabulary': ['Hola - Hello', 'Buenos días - Good morning', 'Buenas tardes - Good afternoon', '¿Cómo te llamas? - What\'s your name?', 'Me llamo - My name is', 'Mucho gusto - Nice to meet you']
                    },
                    {
                        'title': 'Numbers 1-20',
                        'content': 'Master Spanish numbers from one to twenty. Practice counting and basic math expressions.',
                        'vocabulary': ['Uno - One', 'Dos - Two', 'Tres - Three', 'Cuatro - Four', 'Cinco - Five', 'Seis - Six', 'Siete - Seven', 'Ocho - Eight', 'Nueve - Nine', 'Diez - Ten', 'Veinte - Twenty']
                    },
                    {
                        'title': 'Colors and Objects',
                        'content': 'Learn basic colors and common objects around you. Practice describing things using colors.',
                        'vocabulary': ['Rojo - Red', 'Azul - Blue', 'Verde - Green', 'Amarillo - Yellow', 'Negro - Black', 'Blanco - White', 'Mesa - Table', 'Silla - Chair', 'Libro - Book', 'Casa - House']
                    },
                    {
                        'title': 'Family Members',
                        'content': 'Learn vocabulary for family relationships and practice talking about your family.',
                        'vocabulary': ['Familia - Family', 'Padre - Father', 'Madre - Mother', 'Hermano - Brother', 'Hermana - Sister', 'Hijo - Son', 'Hija - Daughter', 'Abuelo - Grandfather', 'Abuela - Grandmother']
                    }
                ]
            },
            {
                'title': 'Present Tense Verbs',
                'description': 'Master essential verbs in present tense to express daily actions',
                'order': 2,
                'lessons': [
                    {
                        'title': 'Verb "Ser" (To Be)',
                        'content': 'Learn the most important verb in Spanish. Use "ser" for permanent characteristics, professions, and nationality.',
                        'vocabulary': ['Soy - I am', 'Eres - You are', 'Es - He/She is', 'Somos - We are', 'Son - They are', 'Estudiante - Student', 'Profesor - Teacher', 'Español - Spanish']
                    },
                    {
                        'title': 'Verb "Estar" (To Be - Location/State)',
                        'content': 'Learn when to use "estar" for temporary states, locations, and ongoing actions.',
                        'vocabulary': ['Estoy - I am', 'Estás - You are', 'Está - He/She is', 'Estamos - We are', 'Están - They are', 'Aquí - Here', 'Allí - There', 'Bien - Well', 'Mal - Bad']
                    },
                    {
                        'title': 'Regular -AR Verbs',
                        'content': 'Learn to conjugate regular verbs ending in -ar like hablar, caminar, and estudiar.',
                        'vocabulary': ['Hablar - To speak', 'Caminar - To walk', 'Estudiar - To study', 'Trabajar - To work', 'Cocinar - To cook', 'Bailar - To dance']
                    },
                    {
                        'title': 'Common Daily Verbs',
                        'content': 'Essential verbs for describing daily activities and routines.',
                        'vocabulary': ['Comer - To eat', 'Beber - To drink', 'Dormir - To sleep', 'Levantarse - To get up', 'Ir - To go', 'Venir - To come', 'Hacer - To do/make']
                    }
                ]
            },
            {
                'title': 'Everyday Conversations',
                'description': 'Practice common phrases and expressions for real-life situations',
                'order': 3,
                'lessons': [
                    {
                        'title': 'At the Store',
                        'content': 'Learn shopping vocabulary and phrases for buying things. Practice asking for prices and quantities.',
                        'vocabulary': ['Tienda - Store', '¿Cuánto cuesta? - How much does it cost?', 'Dinero - Money', 'Barato - Cheap', 'Caro - Expensive', 'Comprar - To buy', 'Vender - To sell']
                    },
                    {
                        'title': 'Asking for Directions',
                        'content': 'Navigate Spanish-speaking cities with confidence. Learn to ask for and understand directions.',
                        'vocabulary': ['¿Dónde está? - Where is?', 'Derecha - Right', 'Izquierda - Left', 'Recto - Straight', 'Cerca - Near', 'Lejos - Far', 'Calle - Street', 'Plaza - Square']
                    },
                    {
                        'title': 'Time and Dates',
                        'content': 'Tell time and express dates in Spanish. Learn days of the week and months.',
                        'vocabulary': ['¿Qué hora es? - What time is it?', 'Hora - Hour', 'Minuto - Minute', 'Lunes - Monday', 'Martes - Tuesday', 'Enero - January', 'Febrero - February']
                    },
                    {
                        'title': 'Weather Talk',
                        'content': 'Discuss weather conditions and seasonal activities in Spanish.',
                        'vocabulary': ['Tiempo - Weather', 'Sol - Sun', 'Lluvia - Rain', 'Nieve - Snow', 'Frío - Cold', 'Calor - Heat', 'Viento - Wind', 'Nublado - Cloudy']
                    }
                ]
            }
        ]

        # Intermediate Spanish Courses
        intermediate_courses = [
            {
                'title': 'Past Tenses',
                'description': 'Learn preterite and imperfect tenses to talk about the past',
                'order': 1,
                'lessons': [
                    {
                        'title': 'Preterite Tense',
                        'content': 'Learn to express completed past actions using the preterite tense.',
                        'vocabulary': ['Ayer - Yesterday', 'Anoche - Last night', 'La semana pasada - Last week', 'Hablé - I spoke', 'Comí - I ate', 'Viví - I lived']
                    },
                    {
                        'title': 'Imperfect Tense',
                        'content': 'Express ongoing past actions and descriptions using the imperfect tense.',
                        'vocabulary': ['Antes - Before', 'Siempre - Always', 'Nunca - Never', 'Hablaba - I was speaking', 'Comía - I was eating', 'Vivía - I was living']
                    },
                    {
                        'title': 'Past vs Imperfect',
                        'content': 'Learn when to use preterite vs imperfect tense in different contexts.',
                        'vocabulary': ['De repente - Suddenly', 'Mientras - While', 'Cuando - When', 'Todos los días - Every day', 'Una vez - Once']
                    },
                    {
                        'title': 'Past Tense Stories',
                        'content': 'Practice telling stories in the past using both tenses appropriately.',
                        'vocabulary': ['Historia - Story', 'Primero - First', 'Después - After', 'Entonces - Then', 'Finalmente - Finally', 'Al final - In the end']
                    }
                ]
            },
            {
                'title': 'Travel Spanish',
                'description': 'Essential Spanish for travelers and tourists',
                'order': 2,
                'lessons': [
                    {
                        'title': 'At the Hotel',
                        'content': 'Learn hotel vocabulary and phrases for check-in, services, and complaints.',
                        'vocabulary': ['Hotel - Hotel', 'Habitación - Room', 'Reserva - Reservation', 'Recepción - Reception', 'Llave - Key', 'Equipaje - Luggage']
                    },
                    {
                        'title': 'Restaurant Orders',
                        'content': 'Order food and drinks confidently in Spanish restaurants.',
                        'vocabulary': ['Restaurante - Restaurant', 'Menú - Menu', 'Camarero - Waiter', 'Plato - Dish', 'Bebida - Drink', 'La cuenta - The bill', 'Propina - Tip']
                    },
                    {
                        'title': 'Transportation',
                        'content': 'Use public transportation and get around cities in Spanish.',
                        'vocabulary': ['Autobús - Bus', 'Metro - Subway', 'Taxi - Taxi', 'Aeropuerto - Airport', 'Estación - Station', 'Billete - Ticket']
                    },
                    {
                        'title': 'Emergency Phrases',
                        'content': 'Handle emergency situations and ask for help in Spanish.',
                        'vocabulary': ['Ayuda - Help', 'Emergencia - Emergency', 'Hospital - Hospital', 'Policía - Police', 'Fuego - Fire', 'Peligro - Danger']
                    }
                ]
            },
            {
                'title': 'Advanced Conversations',
                'description': 'Express opinions, emotions, and complex ideas',
                'order': 3,
                'lessons': [
                    {
                        'title': 'Expressing Opinions',
                        'content': 'Learn to give and ask for opinions on various topics.',
                        'vocabulary': ['Opinar - To think/believe', 'Creo que - I believe that', 'Me parece - It seems to me', 'Estoy de acuerdo - I agree']
                    },
                    {
                        'title': 'Emotions and Feelings',
                        'content': 'Express complex emotions and understand others\' feelings.',
                        'vocabulary': ['Feliz - Happy', 'Triste - Sad', 'Enojado - Angry', 'Nervioso - Nervous', 'Emocionado - Excited', 'Preocupado - Worried']
                    }
                ]
            }
        ]

        # Advanced Spanish Courses
        advanced_courses = [
            {
                'title': 'Subjunctive Mood',
                'description': 'Master the Spanish subjunctive mood for advanced expression',
                'order': 1,
                'lessons': [
                    {
                        'title': 'Present Subjunctive',
                        'content': 'Form and use the present subjunctive for doubt, emotion, and desire.',
                        'vocabulary': ['Ojalá - I hope', 'Es posible que - It\'s possible that', 'Dudo que - I doubt that', 'Espero que - I hope that']
                    },
                    {
                        'title': 'Subjunctive Triggers',
                        'content': 'Learn expressions that require the subjunctive mood.',
                        'vocabulary': ['Es importante que - It\'s important that', 'Es necesario que - It\'s necessary that', 'Me alegra que - I\'m glad that']
                    },
                    {
                        'title': 'Past Subjunctive',
                        'content': 'Form and use the past subjunctive for hypothetical situations.',
                        'vocabulary': ['Si fuera - If I were', 'Como si - As if', 'Ojalá fuera - I wish it were']
                    },
                    {
                        'title': 'Conditional Sentences',
                        'content': 'Create complex conditional structures using subjunctive.',
                        'vocabulary': ['Si tuviera - If I had', 'Habría - Would have', 'Pudiera - Could (subjunctive)']
                    }
                ]
            },
            {
                'title': 'Spanish Literature',
                'description': 'Explore Spanish literature and cultural contexts',
                'order': 2,
                'lessons': [
                    {
                        'title': 'Poetry Reading',
                        'content': 'Read and analyze Spanish poetry from different periods.',
                        'vocabulary': ['Poema - Poem', 'Verso - Verse', 'Rima - Rhyme', 'Metáfora - Metaphor', 'Símbolo - Symbol']
                    },
                    {
                        'title': 'Short Stories',
                        'content': 'Comprehend and discuss Spanish short stories and novels.',
                        'vocabulary': ['Cuento - Short story', 'Novela - Novel', 'Personaje - Character', 'Tema - Theme', 'Argumento - Plot']
                    },
                    {
                        'title': 'Cultural Context',
                        'content': 'Understand Hispanic culture through language and literature.',
                        'vocabulary': ['Cultura - Culture', 'Tradición - Tradition', 'Sociedad - Society', 'Historia - History']
                    },
                    {
                        'title': 'Advanced Writing',
                        'content': 'Write complex texts, essays, and creative pieces in Spanish.',
                        'vocabulary': ['Ensayo - Essay', 'Párrafo - Paragraph', 'Conclusión - Conclusion', 'Argumento - Argument']
                    }
                ]
            }
        ]

        self.create_courses_for_level(beginner_level, beginner_courses)
        self.create_courses_for_level(intermediate_level, intermediate_courses)
        self.create_courses_for_level(advanced_level, advanced_courses)
        
        self.stdout.write(f'✅ Created Spanish course structure')

    def create_french_structure(self):
        """Create comprehensive French course structure"""
        # Create French language
        french, _ = Language.objects.get_or_create(
            code='fr',
            defaults={
                'name': 'French',
                'description': 'Master the language of love, culture, and diplomacy',
                'is_active': True
            }
        )

        # Create levels
        beginner_level, _ = CourseLevel.objects.get_or_create(
            language=french,
            difficulty='beginner',
            defaults={
                'title': 'French Beginner',
                'description': 'Begin your French learning journey with pronunciation and basics',
                'order': 1,
                'is_active': True
            }
        )

        intermediate_level, _ = CourseLevel.objects.get_or_create(
            language=french,
            difficulty='intermediate',
            defaults={
                'title': 'French Intermediate',
                'description': 'Develop conversational skills and cultural understanding',
                'order': 2,
                'required_previous_level': beginner_level,
                'is_active': True
            }
        )

        advanced_level, _ = CourseLevel.objects.get_or_create(
            language=french,
            difficulty='advanced',
            defaults={
                'title': 'French Advanced',
                'description': 'Achieve fluency and explore French literature',
                'order': 3,
                'required_previous_level': intermediate_level,
                'is_active': True
            }
        )

        # French Beginner Courses
        beginner_courses = [
            {
                'title': 'French Fundamentals',
                'description': 'Master French pronunciation, alphabet, and basic expressions',
                'order': 1,
                'lessons': [
                    {
                        'title': 'French Pronunciation',
                        'content': 'Learn the French alphabet, accent marks, and key pronunciation rules.',
                        'vocabulary': ['Bonjour - Hello', 'Bonsoir - Good evening', 'Salut - Hi/Bye', 'Au revoir - Goodbye', 'Merci - Thank you', 'De rien - You\'re welcome']
                    },
                    {
                        'title': 'Articles and Gender',
                        'content': 'Understand French articles and the gender system for nouns.',
                        'vocabulary': ['Le - The (masculine)', 'La - The (feminine)', 'Les - The (plural)', 'Un - A (masculine)', 'Une - A (feminine)', 'Des - Some (plural)']
                    },
                    {
                        'title': 'Numbers 1-30',
                        'content': 'Count in French from one to thirty and learn basic math.',
                        'vocabulary': ['Un - One', 'Deux - Two', 'Trois - Three', 'Quatre - Four', 'Cinq - Five', 'Vingt - Twenty', 'Trente - Thirty']
                    },
                    {
                        'title': 'Basic Introductions',
                        'content': 'Introduce yourself and others in French conversations.',
                        'vocabulary': ['Je suis - I am', 'Tu es - You are', 'Il/Elle est - He/She is', 'Comment vous appelez-vous? - What\'s your name?']
                    }
                ]
            },
            {
                'title': 'French Grammar Basics',
                'description': 'Essential grammar structures for beginners',
                'order': 2,
                'lessons': [
                    {
                        'title': 'Verb "Être" (To Be)',
                        'content': 'Master the most important French verb for descriptions and identity.',
                        'vocabulary': ['Je suis - I am', 'Tu es - You are', 'Il est - He is', 'Elle est - She is', 'Nous sommes - We are', 'Vous êtes - You are', 'Ils sont - They are']
                    },
                    {
                        'title': 'Verb "Avoir" (To Have)',
                        'content': 'Learn the second most important French verb for possession.',
                        'vocabulary': ['J\'ai - I have', 'Tu as - You have', 'Il/Elle a - He/She has', 'Nous avons - We have', 'Vous avez - You have', 'Ils ont - They have']
                    },
                    {
                        'title': 'Regular -ER Verbs',
                        'content': 'Conjugate the most common type of French verbs.',
                        'vocabulary': ['Parler - To speak', 'Manger - To eat', 'Regarder - To watch', 'Écouter - To listen', 'Travailler - To work']
                    },
                    {
                        'title': 'Adjectives and Agreement',
                        'content': 'Learn how adjectives agree with nouns in gender and number.',
                        'vocabulary': ['Grand/Grande - Big', 'Petit/Petite - Small', 'Beau/Belle - Beautiful', 'Bon/Bonne - Good', 'Nouveau/Nouvelle - New']
                    }
                ]
            },
            {
                'title': 'Daily Life in French',
                'description': 'Vocabulary and phrases for everyday situations',
                'order': 3,
                'lessons': [
                    {
                        'title': 'Time and Schedules',
                        'content': 'Tell time and discuss daily schedules in French.',
                        'vocabulary': ['Quelle heure est-il? - What time is it?', 'Heure - Hour', 'Minute - Minute', 'Matin - Morning', 'Après-midi - Afternoon', 'Soir - Evening']
                    },
                    {
                        'title': 'Food and Meals',
                        'content': 'French food vocabulary and dining expressions.',
                        'vocabulary': ['Petit-déjeuner - Breakfast', 'Déjeuner - Lunch', 'Dîner - Dinner', 'Pain - Bread', 'Fromage - Cheese', 'Vin - Wine']
                    },
                    {
                        'title': 'Family and Relationships',
                        'content': 'Talk about family members and relationships.',
                        'vocabulary': ['Famille - Family', 'Père - Father', 'Mère - Mother', 'Frère - Brother', 'Sœur - Sister', 'Enfant - Child']
                    },
                    {
                        'title': 'House and Home',
                        'content': 'Describe your living space and household items.',
                        'vocabulary': ['Maison - House', 'Appartement - Apartment', 'Chambre - Bedroom', 'Cuisine - Kitchen', 'Salon - Living room']
                    }
                ]
            }
        ]

        # French Intermediate Courses
        intermediate_courses = [
            {
                'title': 'French Travel & Culture',
                'description': 'Navigate France and French-speaking countries',
                'order': 1,
                'lessons': [
                    {
                        'title': 'At the Hotel',
                        'content': 'Check in, make reservations, and handle hotel services.',
                        'vocabulary': ['Hôtel - Hotel', 'Réservation - Reservation', 'Chambre - Room', 'Clé - Key', 'Bagages - Luggage']
                    },
                    {
                        'title': 'Transportation',
                        'content': 'Use public transport and navigate French cities.',
                        'vocabulary': ['Métro - Subway', 'Bus - Bus', 'Train - Train', 'Billet - Ticket', 'Gare - Station', 'Aéroport - Airport']
                    },
                    {
                        'title': 'Shopping and Markets',
                        'content': 'Shop at markets, stores, and boutiques in France.',
                        'vocabulary': ['Marché - Market', 'Magasin - Store', 'Prix - Price', 'Cher - Expensive', 'Pas cher - Cheap', 'Vendeur - Seller']
                    },
                    {
                        'title': 'French Cuisine',
                        'content': 'Order at restaurants and understand French gastronomy.',
                        'vocabulary': ['Restaurant - Restaurant', 'Menu - Menu', 'Serveur - Waiter', 'Plat - Dish', 'Dessert - Dessert', 'L\'addition - The bill']
                    }
                ]
            },
            {
                'title': 'Past and Future Tenses',
                'description': 'Express actions in different time periods',
                'order': 2,
                'lessons': [
                    {
                        'title': 'Passé Composé',
                        'content': 'Form the past tense using avoir and être auxiliaries.',
                        'vocabulary': ['J\'ai parlé - I spoke', 'Tu as mangé - You ate', 'Il est allé - He went', 'Elle est venue - She came']
                    },
                    {
                        'title': 'Imparfait',
                        'content': 'Express ongoing past actions and descriptions.',
                        'vocabulary': ['Je parlais - I was speaking', 'Tu mangeais - You were eating', 'Il était - He was', 'Nous avions - We had']
                    },
                    {
                        'title': 'Future Tense',
                        'content': 'Talk about future plans and intentions.',
                        'vocabulary': ['Je parlerai - I will speak', 'Tu mangeras - You will eat', 'Il ira - He will go', 'Nous ferons - We will do']
                    },
                    {
                        'title': 'Conditional Mood',
                        'content': 'Express hypothetical situations and polite requests.',
                        'vocabulary': ['Je voudrais - I would like', 'Tu pourrais - You could', 'Il devrait - He should', 'Nous aimerions - We would like']
                    }
                ]
            }
        ]

        # French Advanced Courses
        advanced_courses = [
            {
                'title': 'French Literature & Arts',
                'description': 'Explore French cultural heritage through literature',
                'order': 1,
                'lessons': [
                    {
                        'title': 'Classic French Literature',
                        'content': 'Read and analyze works by Molière, Voltaire, and Victor Hugo.',
                        'vocabulary': ['Littérature - Literature', 'Roman - Novel', 'Poésie - Poetry', 'Théâtre - Theater', 'Auteur - Author']
                    },
                    {
                        'title': 'French Art and Cinema',
                        'content': 'Discuss French art movements and famous films.',
                        'vocabulary': ['Art - Art', 'Peinture - Painting', 'Cinéma - Cinema', 'Film - Movie', 'Réalisateur - Director']
                    },
                    {
                        'title': 'French Philosophy',
                        'content': 'Explore philosophical concepts in French thought.',
                        'vocabulary': ['Philosophie - Philosophy', 'Pensée - Thought', 'Idée - Idea', 'Concept - Concept', 'Théorie - Theory']
                    }
                ]
            },
            {
                'title': 'Advanced French Grammar',
                'description': 'Master complex grammatical structures',
                'order': 2,
                'lessons': [
                    {
                        'title': 'Subjunctive Mood',
                        'content': 'Use the subjunctive for doubt, emotion, and necessity.',
                        'vocabulary': ['Il faut que - It\'s necessary that', 'Je doute que - I doubt that', 'Bien que - Although']
                    },
                    {
                        'title': 'Complex Pronouns',
                        'content': 'Master direct, indirect, and relative pronouns.',
                        'vocabulary': ['Le/La/Les - Him/Her/Them', 'Lui/Leur - To him/To them', 'Dont - Of which', 'Où - Where']
                    }
                ]
            }
        ]

        self.create_courses_for_level(beginner_level, beginner_courses)
        self.create_courses_for_level(intermediate_level, intermediate_courses)
        self.create_courses_for_level(advanced_level, advanced_courses)
        
        self.stdout.write(f'✅ Created French course structure')

    def create_german_structure(self):
        """Create comprehensive German course structure"""
        # Create German language
        german, _ = Language.objects.get_or_create(
            code='de',
            defaults={
                'name': 'German',
                'description': 'Learn the language of innovation, philosophy, and precision',
                'is_active': True
            }
        )

        # Create levels
        beginner_level, _ = CourseLevel.objects.get_or_create(
            language=german,
            difficulty='beginner',
            defaults={
                'title': 'German Beginner',
                'description': 'Start with German fundamentals and basic grammar',
                'order': 1,
                'is_active': True
            }
        )

        intermediate_level, _ = CourseLevel.objects.get_or_create(
            language=german,
            difficulty='intermediate',
            defaults={
                'title': 'German Intermediate', 
                'description': 'Build practical German skills for real-world use',
                'order': 2,
                'required_previous_level': beginner_level,
                'is_active': True
            }
        )

        advanced_level, _ = CourseLevel.objects.get_or_create(
            language=german,
            difficulty='advanced',
            defaults={
                'title': 'German Advanced',
                'description': 'Master complex German grammar and business language',
                'order': 3,
                'required_previous_level': intermediate_level,
                'is_active': True
            }
        )

        # German Beginner Courses
        beginner_courses = [
            {
                'title': 'German Basics',
                'description': 'German pronunciation, alphabet, and essential expressions',
                'order': 1,
                'lessons': [
                    {
                        'title': 'German Pronunciation',
                        'content': 'Master German sounds, umlauts (ä, ö, ü), and the ß character.',
                        'vocabulary': ['Hallo - Hello', 'Guten Tag - Good day', 'Auf Wiedersehen - Goodbye', 'Danke - Thank you', 'Bitte - Please/You\'re welcome']
                    },
                    {
                        'title': 'German Cases Introduction',
                        'content': 'Introduction to the four German cases: Nominativ, Akkusativ, Dativ, Genitiv.',
                        'vocabulary': ['Der - The (masculine)', 'Die - The (feminine)', 'Das - The (neuter)', 'Den - The (accusative)', 'Dem - The (dative)']
                    },
                    {
                        'title': 'Numbers and Counting',
                        'content': 'German numbers from 1-100 and basic counting.',
                        'vocabulary': ['Eins - One', 'Zwei - Two', 'Drei - Three', 'Vier - Four', 'Fünf - Five', 'Zwanzig - Twenty', 'Hundert - Hundred']
                    },
                    {
                        'title': 'Personal Introductions',
                        'content': 'Introduce yourself and ask basic personal questions.',
                        'vocabulary': ['Ich bin - I am', 'Wie heißen Sie? - What\'s your name?', 'Ich heiße - My name is', 'Woher kommen Sie? - Where are you from?']
                    }
                ]
            },
            {
                'title': 'German Grammar Foundation',
                'description': 'Essential grammar structures for German beginners',
                'order': 2,
                'lessons': [
                    {
                        'title': 'Verb "Sein" (To Be)',
                        'content': 'Master the most important German verb for identity and description.',
                        'vocabulary': ['Ich bin - I am', 'Du bist - You are', 'Er/Sie ist - He/She is', 'Wir sind - We are', 'Ihr seid - You are (plural)', 'Sie sind - They are']
                    },
                    {
                        'title': 'Verb "Haben" (To Have)',
                        'content': 'Learn possession and perfect tense auxiliary verb.',
                        'vocabulary': ['Ich habe - I have', 'Du hast - You have', 'Er/Sie hat - He/She has', 'Wir haben - We have', 'Ihr habt - You have', 'Sie haben - They have']
                    },
                    {
                        'title': 'Regular Verbs',
                        'content': 'Conjugate regular German verbs in present tense.',
                        'vocabulary': ['Sprechen - To speak', 'Lernen - To learn', 'Arbeiten - To work', 'Wohnen - To live', 'Kaufen - To buy']
                    },
                    {
                        'title': 'Word Order',
                        'content': 'Understand German sentence structure and word order rules.',
                        'vocabulary': ['Heute - Today', 'Morgen - Tomorrow', 'Gestern - Yesterday', 'Aber - But', 'Und - And', 'Oder - Or']
                    }
                ]
            },
            {
                'title': 'Everyday German',
                'description': 'Practical vocabulary for daily situations',
                'order': 3,
                'lessons': [
                    {
                        'title': 'German Food and Dining',
                        'content': 'Food vocabulary and restaurant expressions.',
                        'vocabulary': ['Essen - Food', 'Trinken - Drink', 'Brot - Bread', 'Fleisch - Meat', 'Gemüse - Vegetables', 'Restaurant - Restaurant']
                    },
                    {
                        'title': 'Shopping in Germany',
                        'content': 'Shopping vocabulary and expressions for stores.',
                        'vocabulary': ['Geschäft - Store', 'Kaufen - To buy', 'Verkaufen - To sell', 'Geld - Money', 'Preis - Price', 'Teuer - Expensive']
                    },
                    {
                        'title': 'Time and Schedules',
                        'content': 'Tell time and discuss schedules in German.',
                        'vocabulary': ['Zeit - Time', 'Uhr - Clock/O\'clock', 'Stunde - Hour', 'Minute - Minute', 'Früh - Early', 'Spät - Late']
                    },
                    {
                        'title': 'Weather and Seasons',
                        'content': 'Discuss weather conditions and seasonal activities.',
                        'vocabulary': ['Wetter - Weather', 'Sonne - Sun', 'Regen - Rain', 'Schnee - Snow', 'Winter - Winter', 'Sommer - Summer']
                    }
                ]
            }
        ]

        # German Intermediate Courses  
        intermediate_courses = [
            {
                'title': 'German Travel & Culture',
                'description': 'Navigate German-speaking countries with confidence',
                'order': 1,
                'lessons': [
                    {
                        'title': 'Transportation in Germany',
                        'content': 'Use public transport and travel vocabulary.',
                        'vocabulary': ['Zug - Train', 'Bus - Bus', 'Auto - Car', 'Flugzeug - Airplane', 'Bahnhof - Train station', 'Fahrkarte - Ticket']
                    },
                    {
                        'title': 'German Hotels and Accommodation',
                        'content': 'Book rooms and handle hotel services.',
                        'vocabulary': ['Hotel - Hotel', 'Zimmer - Room', 'Reservierung - Reservation', 'Schlüssel - Key', 'Gepäck - Luggage']
                    },
                    {
                        'title': 'German Cities and Sights',
                        'content': 'Discuss German cities, landmarks, and attractions.',
                        'vocabulary': ['Stadt - City', 'Museum - Museum', 'Kirche - Church', 'Schloss - Castle', 'Park - Park', 'Platz - Square']
                    },
                    {
                        'title': 'German Festivals and Traditions',
                        'content': 'Learn about German culture and celebrations.',
                        'vocabulary': ['Fest - Festival', 'Oktoberfest - Oktoberfest', 'Weihnachten - Christmas', 'Ostern - Easter', 'Tradition - Tradition']
                    }
                ]
            },
            {
                'title': 'Complex German Grammar',
                'description': 'Master advanced grammatical structures',
                'order': 2,
                'lessons': [
                    {
                        'title': 'Separable Verbs',
                        'content': 'Learn German separable verbs and their usage.',
                        'vocabulary': ['Aufstehen - To get up', 'Ankommen - To arrive', 'Einkaufen - To shop', 'Ausgehen - To go out', 'Mitkommen - To come along']
                    },
                    {
                        'title': 'Modal Verbs',
                        'content': 'Express ability, necessity, and permission.',
                        'vocabulary': ['Können - Can/To be able to', 'Müssen - Must/To have to', 'Sollen - Should', 'Wollen - To want to', 'Dürfen - May/To be allowed to']
                    },
                    {
                        'title': 'Perfect Tense',
                        'content': 'Form the past tense using haben and sein.',
                        'vocabulary': ['Ich habe gesprochen - I have spoken', 'Du bist gegangen - You have gone', 'Er hat gemacht - He has done']
                    },
                    {
                        'title': 'Comparative and Superlative',
                        'content': 'Make comparisons and express extremes.',
                        'vocabulary': ['Größer - Bigger', 'Kleiner - Smaller', 'Besser - Better', 'Der größte - The biggest', 'Am besten - The best']
                    }
                ]
            }
        ]

        # German Advanced Courses
        advanced_courses = [
            {
                'title': 'Business German',
                'description': 'Professional German for workplace communication',
                'order': 1,
                'lessons': [
                    {
                        'title': 'Office Vocabulary',
                        'content': 'Essential vocabulary for the German workplace.',
                        'vocabulary': ['Büro - Office', 'Besprechung - Meeting', 'Vertrag - Contract', 'Geschäft - Business', 'Kollege - Colleague']
                    },
                    {
                        'title': 'Email and Correspondence',
                        'content': 'Write professional emails and letters in German.',
                        'vocabulary': ['E-Mail - Email', 'Brief - Letter', 'Betreff - Subject', 'Anhang - Attachment', 'Mit freundlichen Grüßen - Kind regards']
                    },
                    {
                        'title': 'Presentations and Meetings',
                        'content': 'Give presentations and participate in business meetings.',
                        'vocabulary': ['Präsentation - Presentation', 'Folie - Slide', 'Diskussion - Discussion', 'Entscheidung - Decision']
                    }
                ]
            },
            {
                'title': 'German Literature and Philosophy',
                'description': 'Explore German intellectual heritage',
                'order': 2,
                'lessons': [
                    {
                        'title': 'German Classical Literature',
                        'content': 'Read works by Goethe, Schiller, and other masters.',
                        'vocabulary': ['Literatur - Literature', 'Gedicht - Poem', 'Roman - Novel', 'Drama - Drama', 'Dichter - Poet']
                    },
                    {
                        'title': 'German Philosophy',
                        'content': 'Understand concepts from Kant, Nietzsche, and Hegel.',
                        'vocabulary': ['Philosophie - Philosophy', 'Denken - Thinking', 'Wahrheit - Truth', 'Erkenntnis - Knowledge']
                    }
                ]
            }
        ]

        self.create_courses_for_level(beginner_level, beginner_courses)
        self.create_courses_for_level(intermediate_level, intermediate_courses)
        self.create_courses_for_level(advanced_level, advanced_courses)
        
        self.stdout.write(f'✅ Created German course structure')

    def create_italian_structure(self):
        """Create comprehensive Italian course structure"""
        italian, _ = Language.objects.get_or_create(
            code='it',
            defaults={
                'name': 'Italian',
                'description': 'Discover the musical language of Italy, art, and cuisine',
                'is_active': True
            }
        )

        # Create levels
        beginner_level, _ = CourseLevel.objects.get_or_create(
            language=italian,
            difficulty='beginner',
            defaults={
                'title': 'Italian Beginner',
                'description': 'Learn beautiful Italian pronunciation and basic communication',
                'order': 1,
                'is_active': True
            }
        )

        intermediate_level, _ = CourseLevel.objects.get_or_create(
            language=italian,
            difficulty='intermediate',
            defaults={
                'title': 'Italian Intermediate',
                'description': 'Explore Italian culture and build conversational skills',
                'order': 2,
                'required_previous_level': beginner_level,
                'is_active': True
            }
        )

        advanced_level, _ = CourseLevel.objects.get_or_create(
            language=italian,
            difficulty='advanced',
            defaults={
                'title': 'Italian Advanced',
                'description': 'Master Italian literature, art history, and regional dialects',
                'order': 3,
                'required_previous_level': intermediate_level,
                'is_active': True
            }
        )

        # Italian Beginner Courses
        beginner_courses = [
            {
                'title': 'Italian Essentials',
                'description': 'Beautiful Italian sounds, alphabet, and greetings',
                'order': 1,
                'lessons': [
                    {
                        'title': 'Italian Pronunciation',
                        'content': 'Master Italian pronunciation and musicality of the language.',
                        'vocabulary': ['Ciao - Hello/Goodbye', 'Buongiorno - Good morning', 'Buonasera - Good evening', 'Grazie - Thank you', 'Prego - You\'re welcome', 'Scusi - Excuse me']
                    },
                    {
                        'title': 'Italian Alphabet and Sounds',
                        'content': 'Learn the Italian alphabet and key pronunciation rules.',
                        'vocabulary': ['A - A', 'B - Bi', 'C - Ci', 'D - Di', 'E - E', 'F - Effe', 'G - Gi', 'H - Acca']
                    },
                    {
                        'title': 'Basic Italian Greetings',
                        'content': 'Greet people throughout the day in Italian.',
                        'vocabulary': ['Buongiorno - Good morning', 'Buon pomeriggio - Good afternoon', 'Buonasera - Good evening', 'Buonanotte - Good night']
                    },
                    {
                        'title': 'Italian Numbers',
                        'content': 'Count from 1 to 50 in Italian.',
                        'vocabulary': ['Uno - One', 'Due - Two', 'Tre - Three', 'Quattro - Four', 'Cinque - Five', 'Dieci - Ten', 'Venti - Twenty']
                    }
                ]
            },
            {
                'title': 'Italian Grammar Basics',
                'description': 'Essential Italian grammar and sentence structure',
                'order': 2,
                'lessons': [
                    {
                        'title': 'Italian Articles',
                        'content': 'Learn definite and indefinite articles in Italian.',
                        'vocabulary': ['Il - The (masculine)', 'La - The (feminine)', 'Un - A (masculine)', 'Una - A (feminine)', 'Gli - The (masculine plural)', 'Le - The (feminine plural)']
                    },
                    {
                        'title': 'Verb "Essere" (To Be)',
                        'content': 'Master the most important Italian verb.',
                        'vocabulary': ['Io sono - I am', 'Tu sei - You are', 'Lui/Lei è - He/She is', 'Noi siamo - We are', 'Voi siete - You are', 'Loro sono - They are']
                    },
                    {
                        'title': 'Verb "Avere" (To Have)',
                        'content': 'Learn possession and compound tenses auxiliary.',
                        'vocabulary': ['Io ho - I have', 'Tu hai - You have', 'Lui/Lei ha - He/She has', 'Noi abbiamo - We have', 'Voi avete - You have', 'Loro hanno - They have']
                    },
                    {
                        'title': 'Regular -ARE Verbs',
                        'content': 'Conjugate the most common Italian verb group.',
                        'vocabulary': ['Parlare - To speak', 'Mangiare - To eat', 'Studiare - To study', 'Lavorare - To work', 'Cantare - To sing']
                    }
                ]
            },
            {
                'title': 'Italian Daily Life',
                'description': 'Vocabulary for everyday Italian situations',
                'order': 3,
                'lessons': [
                    {
                        'title': 'Italian Cuisine',
                        'content': 'Food vocabulary and dining expressions.',
                        'vocabulary': ['Pizza - Pizza', 'Pasta - Pasta', 'Gelato - Ice cream', 'Caffè - Coffee', 'Vino - Wine', 'Ristorante - Restaurant']
                    },
                    {
                        'title': 'Italian Family',
                        'content': 'Family members and relationships.',
                        'vocabulary': ['Famiglia - Family', 'Padre - Father', 'Madre - Mother', 'Fratello - Brother', 'Sorella - Sister', 'Figlio - Son', 'Figlia - Daughter']
                    },
                    {
                        'title': 'Colors and Descriptions',
                        'content': 'Describe people and things using colors and adjectives.',
                        'vocabulary': ['Rosso - Red', 'Blu - Blue', 'Verde - Green', 'Giallo - Yellow', 'Nero - Black', 'Bianco - White', 'Grande - Big', 'Piccolo - Small']
                    },
                    {
                        'title': 'Italian Weather',
                        'content': 'Discuss weather and seasons in Italy.',
                        'vocabulary': ['Tempo - Weather', 'Sole - Sun', 'Pioggia - Rain', 'Neve - Snow', 'Caldo - Hot', 'Freddo - Cold']
                    }
                ]
            }
        ]

        # Italian Intermediate Courses
        intermediate_courses = [
            {
                'title': 'Italian Culture & Traditions',
                'description': 'Explore Italian culture, history, and regional differences',
                'order': 1,
                'lessons': [
                    {
                        'title': 'Italian Regions',
                        'content': 'Discover the different regions of Italy and their characteristics.',
                        'vocabulary': ['Nord - North', 'Sud - South', 'Centro - Center', 'Regione - Region', 'Città - City', 'Paese - Country/Village']
                    },
                    {
                        'title': 'Italian Art and Architecture',
                        'content': 'Learn about Italian Renaissance art and famous artists.',
                        'vocabulary': ['Arte - Art', 'Museo - Museum', 'Pittura - Painting', 'Scultura - Sculpture', 'Architettura - Architecture', 'Rinascimento - Renaissance']
                    },
                    {
                        'title': 'Italian Festivals',
                        'content': 'Traditional Italian celebrations and holidays.',
                        'vocabulary': ['Festa - Festival', 'Carnevale - Carnival', 'Natale - Christmas', 'Pasqua - Easter', 'Tradizione - Tradition']
                    },
                    {
                        'title': 'Italian Fashion and Style',
                        'content': 'Fashion vocabulary and Italian style concepts.',
                        'vocabulary': ['Moda - Fashion', 'Vestito - Dress', 'Scarpe - Shoes', 'Elegante - Elegant', 'Stile - Style', 'Boutique - Boutique']
                    }
                ]
            },
            {
                'title': 'Italian Past Tenses',
                'description': 'Express past actions and experiences',
                'order': 2,
                'lessons': [
                    {
                        'title': 'Passato Prossimo',
                        'content': 'Form the near past tense with avere and essere.',
                        'vocabulary': ['Ho parlato - I spoke', 'Hai mangiato - You ate', 'È andato - He went', 'Siamo stati - We were']
                    },
                    {
                        'title': 'Imperfetto',
                        'content': 'Express ongoing past actions and descriptions.',
                        'vocabulary': ['Parlavo - I was speaking', 'Mangiavi - You were eating', 'Era - He/She was', 'Facevamo - We were doing']
                    },
                    {
                        'title': 'Past vs Imperfect',
                        'content': 'Learn when to use each past tense.',
                        'vocabulary': ['Ieri - Yesterday', 'Sempre - Always', 'Spesso - Often', 'Una volta - Once', 'Mentre - While']
                    }
                ]
            }
        ]

        # Italian Advanced Courses
        advanced_courses = [
            {
                'title': 'Italian Literature & Cinema',
                'description': 'Explore Italian cultural masterpieces',
                'order': 1,
                'lessons': [
                    {
                        'title': 'Italian Literature',
                        'content': 'Read works by Dante, Petrarca, and modern authors.',
                        'vocabulary': ['Letteratura - Literature', 'Poesia - Poetry', 'Romanzo - Novel', 'Racconto - Short story', 'Scrittore - Writer']
                    },
                    {
                        'title': 'Italian Cinema',
                        'content': 'Discuss famous Italian films and directors.',
                        'vocabulary': ['Cinema - Cinema', 'Film - Movie', 'Regista - Director', 'Attore - Actor', 'Attrice - Actress']
                    }
                ]
            },
            {
                'title': 'Advanced Italian Grammar',
                'description': 'Master complex grammatical structures',
                'order': 2,
                'lessons': [
                    {
                        'title': 'Subjunctive Mood',
                        'content': 'Use the subjunctive for doubt, emotion, and opinion.',
                        'vocabulary': ['Credo che - I believe that', 'Penso che - I think that', 'È possibile che - It\'s possible that']
                    },
                    {
                        'title': 'Conditional and Hypothetical',
                        'content': 'Express hypothetical situations and polite requests.',
                        'vocabulary': ['Vorrei - I would like', 'Potrebbe - Could', 'Se fossi - If I were']
                    }
                ]
            }
        ]

        self.create_courses_for_level(beginner_level, beginner_courses)
        self.create_courses_for_level(intermediate_level, intermediate_courses)
        self.create_courses_for_level(advanced_level, advanced_courses)
        
        self.stdout.write(f'✅ Created Italian course structure')

    def create_japanese_structure(self):
        """Create comprehensive Japanese course structure"""
        japanese, _ = Language.objects.get_or_create(
            code='ja',
            defaults={
                'name': 'Japanese',
                'description': 'Explore the fascinating world of Japanese language and culture',
                'is_active': True
            }
        )

        # Create levels
        beginner_level, _ = CourseLevel.objects.get_or_create(
            language=japanese,
            difficulty='beginner',
            defaults={
                'title': 'Japanese Beginner',
                'description': 'Master Japanese writing systems and basic communication',
                'order': 1,
                'is_active': True
            }
        )

        intermediate_level, _ = CourseLevel.objects.get_or_create(
            language=japanese,
            difficulty='intermediate',
            defaults={
                'title': 'Japanese Intermediate',
                'description': 'Learn essential Kanji and conversational Japanese',
                'order': 2,
                'required_previous_level': beginner_level,
                'is_active': True
            }
        )

        advanced_level, _ = CourseLevel.objects.get_or_create(
            language=japanese,
            difficulty='advanced',
            defaults={
                'title': 'Japanese Advanced',
                'description': 'Master complex Kanji, keigo (polite language), and business Japanese',
                'order': 3,
                'required_previous_level': intermediate_level,
                'is_active': True
            }
        )

        # Japanese Beginner Courses
        beginner_courses = [
            {
                'title': 'Hiragana & Katakana',
                'description': 'Master the two Japanese phonetic writing systems',
                'order': 1,
                'lessons': [
                    {
                        'title': 'Hiragana Basics (あ-の)',
                        'content': 'Learn the first set of Hiragana characters and their pronunciation.',
                        'vocabulary': ['あ (a)', 'い (i)', 'う (u)', 'え (e)', 'お (o)', 'か (ka)', 'き (ki)', 'く (ku)', 'け (ke)', 'こ (ko)']
                    },
                    {
                        'title': 'Hiragana Complete',
                        'content': 'Complete the Hiragana alphabet and practice reading.',
                        'vocabulary': ['さ (sa)', 'し (shi)', 'す (su)', 'せ (se)', 'そ (so)', 'た (ta)', 'ち (chi)', 'つ (tsu)', 'て (te)', 'と (to)']
                    },
                    {
                        'title': 'Katakana Basics',
                        'content': 'Learn Katakana for foreign words and names.',
                        'vocabulary': ['ア (a)', 'イ (i)', 'ウ (u)', 'エ (e)', 'オ (o)', 'カ (ka)', 'キ (ki)', 'ク (ku)', 'ケ (ke)', 'コ (ko)']
                    },
                    {
                        'title': 'Basic Japanese Greetings',
                        'content': 'Essential Japanese greetings and polite expressions.',
                        'vocabulary': ['こんにちは (Konnichiwa) - Hello', 'おはよう (Ohayou) - Good morning', 'ありがとう (Arigatou) - Thank you', 'すみません (Sumimasen) - Excuse me']
                    }
                ]
            },
            {
                'title': 'Japanese Grammar Foundation',
                'description': 'Basic Japanese sentence structure and particles',
                'order': 2,
                'lessons': [
                    {
                        'title': 'Japanese Particles (は、が、を)',
                        'content': 'Learn the most important Japanese particles for sentence structure.',
                        'vocabulary': ['は (wa) - Topic particle', 'が (ga) - Subject particle', 'を (wo) - Object particle', 'に (ni) - Direction/Time', 'で (de) - Location/Method']
                    },
                    {
                        'title': 'Verb "だ/である" (To Be)',
                        'content': 'Learn the Japanese copula for identity and description.',
                        'vocabulary': ['だ (da) - Is (casual)', 'です (desu) - Is (polite)', 'である (de aru) - Is (formal)', 'じゃない (ja nai) - Is not']
                    },
                    {
                        'title': 'Basic Japanese Verbs',
                        'content': 'Learn essential Japanese verbs and their forms.',
                        'vocabulary': ['食べる (taberu) - To eat', '飲む (nomu) - To drink', '行く (iku) - To go', '来る (kuru) - To come', 'する (suru) - To do']
                    },
                    {
                        'title': 'Adjectives (い and な)',
                        'content': 'Learn Japanese adjective types and their usage.',
                        'vocabulary': ['大きい (ookii) - Big', '小さい (chiisai) - Small', '美しい (utsukushii) - Beautiful', '静か (shizuka) - Quiet', '有名 (yuumei) - Famous']
                    }
                ]
            },
            {
                'title': 'Japanese Daily Life',
                'description': 'Practical vocabulary for everyday situations',
                'order': 3,
                'lessons': [
                    {
                        'title': 'Japanese Numbers and Counting',
                        'content': 'Learn Japanese numbers and different counting systems.',
                        'vocabulary': ['一 (ichi) - One', '二 (ni) - Two', '三 (san) - Three', '四 (yon/shi) - Four', '五 (go) - Five', '十 (juu) - Ten']
                    },
                    {
                        'title': 'Time in Japanese',
                        'content': 'Tell time and discuss schedules in Japanese.',
                        'vocabulary': ['時間 (jikan) - Time', '時 (ji) - Hour', '分 (fun/pun) - Minute', '今 (ima) - Now', '朝 (asa) - Morning', '夜 (yoru) - Night']
                    },
                    {
                        'title': 'Japanese Food Culture',
                        'content': 'Learn food vocabulary and dining expressions.',
                        'vocabulary': ['食べ物 (tabemono) - Food', 'ご飯 (gohan) - Rice/Meal', 'すし (sushi) - Sushi', 'ラーメン (raamen) - Ramen', 'お茶 (ocha) - Tea']
                    },
                    {
                        'title': 'Japanese Family',
                        'content': 'Family members and relationships in Japanese.',
                        'vocabulary': ['家族 (kazoku) - Family', '父 (chichi) - Father', '母 (haha) - Mother', '兄 (ani) - Older brother', '姉 (ane) - Older sister']
                    }
                ]
            }
        ]

        # Japanese Intermediate Courses
        intermediate_courses = [
            {
                'title': 'Kanji Fundamentals',
                'description': 'Learn essential Kanji characters and their meanings',
                'order': 1,
                'lessons': [
                    {
                        'title': 'Basic Kanji (人、日、本、水)',
                        'content': 'Learn fundamental Kanji characters and their readings.',
                        'vocabulary': ['人 (hito/jin) - Person', '日 (hi/nichi) - Day/Sun', '本 (hon/moto) - Book/Origin', '水 (mizu/sui) - Water']
                    },
                    {
                        'title': 'Number Kanji',
                        'content': 'Learn Kanji for numbers and counting.',
                        'vocabulary': ['一 (ichi) - One', '二 (ni) - Two', '三 (san) - Three', '四 (yon/shi) - Four', '五 (go) - Five']
                    },
                    {
                        'title': 'Nature Kanji',
                        'content': 'Kanji related to nature and elements.',
                        'vocabulary': ['木 (ki/moku) - Tree', '火 (hi/ka) - Fire', '土 (tsuchi/do) - Earth', '金 (kin/kane) - Metal/Gold', '山 (yama/san) - Mountain']
                    },
                    {
                        'title': 'Body Parts Kanji',
                        'content': 'Learn Kanji for body parts and actions.',
                        'vocabulary': ['手 (te/shu) - Hand', '足 (ashi/soku) - Foot/Leg', '目 (me/moku) - Eye', '口 (kuchi/kou) - Mouth', '耳 (mimi/ji) - Ear']
                    }
                ]
            },
            {
                'title': 'Japanese Conversation',
                'description': 'Build practical conversation skills',
                'order': 2,
                'lessons': [
                    {
                        'title': 'Shopping in Japan',
                        'content': 'Shopping vocabulary and expressions for stores.',
                        'vocabulary': ['買い物 (kaimono) - Shopping', '店 (mise) - Store', '値段 (nedan) - Price', '安い (yasui) - Cheap', '高い (takai) - Expensive']
                    },
                    {
                        'title': 'Transportation',
                        'content': 'Navigate Japanese transportation systems.',
                        'vocabulary': ['電車 (densha) - Train', 'バス (basu) - Bus', '駅 (eki) - Station', '切符 (kippu) - Ticket', '地下鉄 (chikatetsu) - Subway']
                    },
                    {
                        'title': 'Asking Directions',
                        'content': 'Ask for and understand directions in Japanese.',
                        'vocabulary': ['どこ (doko) - Where', '右 (migi) - Right', '左 (hidari) - Left', 'まっすぐ (massugu) - Straight', '近い (chikai) - Near']
                    }
                ]
            }
        ]

        # Japanese Advanced Courses
        advanced_courses = [
            {
                'title': 'Advanced Kanji & Reading',
                'description': 'Master complex Kanji and reading comprehension',
                'order': 1,
                'lessons': [
                    {
                        'title': 'Complex Kanji Combinations',
                        'content': 'Learn compound Kanji words and their meanings.',
                        'vocabulary': ['学校 (gakkou) - School', '病院 (byouin) - Hospital', '図書館 (toshokan) - Library', '空港 (kuukou) - Airport']
                    },
                    {
                        'title': 'Japanese Reading Practice',
                        'content': 'Practice reading Japanese texts with mixed scripts.',
                        'vocabulary': ['読む (yomu) - To read', '書く (kaku) - To write', '理解 (rikai) - Understanding', '意味 (imi) - Meaning']
                    }
                ]
            },
            {
                'title': 'Business Japanese',
                'description': 'Professional Japanese and keigo (polite language)',
                'order': 2,
                'lessons': [
                    {
                        'title': 'Keigo (Polite Language)',
                        'content': 'Learn respectful and humble forms of Japanese.',
                        'vocabulary': ['いらっしゃいませ (irasshaimase) - Welcome (polite)', 'ございます (gozaimasu) - Polite form of "aru"', 'させていただきます (sasete itadakimasu) - Humble form']
                    },
                    {
                        'title': 'Business Meetings',
                        'content': 'Professional vocabulary for business situations.',
                        'vocabulary': ['会議 (kaigi) - Meeting', '会社 (kaisha) - Company', '仕事 (shigoto) - Work', '部長 (buchou) - Department manager']
                    }
                ]
            }
        ]

        self.create_courses_for_level(beginner_level, beginner_courses)
        self.create_courses_for_level(intermediate_level, intermediate_courses)
        self.create_courses_for_level(advanced_level, advanced_courses)
        
        self.stdout.write(f'✅ Created Japanese course structure')

    def create_portuguese_structure(self):
        """Create comprehensive Portuguese course structure"""
        portuguese, _ = Language.objects.get_or_create(
            code='pt',
            defaults={
                'name': 'Portuguese',
                'description': 'Learn Portuguese for Brazil and Portugal with cultural insights',
                'is_active': True
            }
        )

        # Create levels
        beginner_level, _ = CourseLevel.objects.get_or_create(
            language=portuguese,
            difficulty='beginner',
            defaults={
                'title': 'Portuguese Beginner',
                'description': 'Start with Portuguese basics and pronunciation',
                'order': 1,
                'is_active': True
            }
        )

        intermediate_level, _ = CourseLevel.objects.get_or_create(
            language=portuguese,
            difficulty='intermediate',
            defaults={
                'title': 'Portuguese Intermediate',
                'description': 'Build conversational skills and cultural knowledge',
                'order': 2,
                'required_previous_level': beginner_level,
                'is_active': True
            }
        )

        advanced_level, _ = CourseLevel.objects.get_or_create(
            language=portuguese,
            difficulty='advanced',
            defaults={
                'title': 'Portuguese Advanced',
                'description': 'Master Portuguese literature and regional variations',
                'order': 3,
                'required_previous_level': intermediate_level,
                'is_active': True
            }
        )

        # Portuguese Beginner Courses
        beginner_courses = [
            {
                'title': 'Portuguese Basics',
                'description': 'Portuguese pronunciation, alphabet, and essential phrases',
                'order': 1,
                'lessons': [
                    {
                        'title': 'Portuguese Pronunciation',
                        'content': 'Master Portuguese sounds including nasal vowels and distinctive consonants.',
                        'vocabulary': ['Olá - Hello', 'Oi - Hi', 'Tchau - Bye', 'Obrigado/Obrigada - Thank you', 'Por favor - Please', 'Com licença - Excuse me']
                    },
                    {
                        'title': 'Portuguese Alphabet',
                        'content': 'Learn the Portuguese alphabet and letter sounds.',
                        'vocabulary': ['A - A', 'B - Bê', 'C - Cê', 'D - Dê', 'E - É', 'F - Efe', 'G - Gê', 'H - Agá']
                    },
                    {
                        'title': 'Basic Greetings',
                        'content': 'Greet people throughout the day in Portuguese.',
                        'vocabulary': ['Bom dia - Good morning', 'Boa tarde - Good afternoon', 'Boa noite - Good evening/night', 'Como vai? - How are you?']
                    },
                    {
                        'title': 'Numbers 1-20',
                        'content': 'Learn Portuguese numbers and basic counting.',
                        'vocabulary': ['Um - One', 'Dois - Two', 'Três - Three', 'Quatro - Four', 'Cinco - Five', 'Dez - Ten', 'Vinte - Twenty']
                    }
                ]
            },
            {
                'title': 'Portuguese Grammar Foundation',
                'description': 'Essential grammar for Portuguese beginners',
                'order': 2,
                'lessons': [
                    {
                        'title': 'Portuguese Articles',
                        'content': 'Learn definite and indefinite articles with gender agreement.',
                        'vocabulary': ['O - The (masculine)', 'A - The (feminine)', 'Um - A (masculine)', 'Uma - A (feminine)', 'Os - The (masculine plural)', 'As - The (feminine plural)']
                    },
                    {
                        'title': 'Verb "Ser" (To Be)',
                        'content': 'Master the permanent form of "to be" in Portuguese.',
                        'vocabulary': ['Eu sou - I am', 'Tu és/Você é - You are', 'Ele/Ela é - He/She is', 'Nós somos - We are', 'Vocês são - You are (plural)', 'Eles são - They are']
                    },
                    {
                        'title': 'Verb "Estar" (To Be - Location/State)',
                        'content': 'Learn the temporary form of "to be" for location and states.',
                        'vocabulary': ['Eu estou - I am', 'Tu estás/Você está - You are', 'Ele/Ela está - He/She is', 'Nós estamos - We are', 'Vocês estão - You are', 'Eles estão - They are']
                    },
                    {
                        'title': 'Regular -AR Verbs',
                        'content': 'Conjugate regular verbs ending in -ar.',
                        'vocabulary': ['Falar - To speak', 'Estudar - To study', 'Trabalhar - To work', 'Morar - To live', 'Gostar - To like']
                    }
                ]
            },
            {
                'title': 'Portuguese Daily Life',
                'description': 'Practical vocabulary for everyday situations',
                'order': 3,
                'lessons': [
                    {
                        'title': 'Portuguese vs Brazilian Portuguese',
                        'content': 'Learn the differences between European and Brazilian Portuguese.',
                        'vocabulary': ['Você (BR) / Tu (PT) - You', 'Ônibus (BR) / Autocarro (PT) - Bus', 'Banheiro (BR) / Casa de banho (PT) - Bathroom']
                    },
                    {
                        'title': 'Family and Relationships',
                        'content': 'Family vocabulary and relationship terms.',
                        'vocabulary': ['Família - Family', 'Pai - Father', 'Mãe - Mother', 'Irmão - Brother', 'Irmã - Sister', 'Filho - Son', 'Filha - Daughter']
                    },
                    {
                        'title': 'Portuguese Food Culture',
                        'content': 'Food vocabulary and dining customs.',
                        'vocabulary': ['Comida - Food', 'Água - Water', 'Café - Coffee', 'Pão - Bread', 'Arroz - Rice', 'Feijão - Beans', 'Restaurante - Restaurant']
                    },
                    {
                        'title': 'Time and Dates',
                        'content': 'Tell time and express dates in Portuguese.',
                        'vocabulary': ['Hora - Hour', 'Minuto - Minute', 'Hoje - Today', 'Amanhã - Tomorrow', 'Ontem - Yesterday', 'Segunda-feira - Monday']
                    }
                ]
            }
        ]

        # Portuguese Intermediate Courses
        intermediate_courses = [
            {
                'title': 'Portuguese Culture & Travel',
                'description': 'Explore Portuguese-speaking countries and their cultures',
                'order': 1,
                'lessons': [
                    {
                        'title': 'Brazil vs Portugal',
                        'content': 'Cultural differences between Brazil and Portugal.',
                        'vocabulary': ['Brasil - Brazil', 'Portugal - Portugal', 'Cultura - Culture', 'Tradição - Tradition', 'Costume - Custom']
                    },
                    {
                        'title': 'Travel in Lusophone Countries',
                        'content': 'Travel vocabulary for Portuguese-speaking countries.',
                        'vocabulary': ['Viagem - Trip', 'Hotel - Hotel', 'Praia - Beach', 'Cidade - City', 'Passaporte - Passport', 'Aeroporto - Airport']
                    },
                    {
                        'title': 'Portuguese Music and Arts',
                        'content': 'Explore Fado, Bossa Nova, and Portuguese arts.',
                        'vocabulary': ['Música - Music', 'Fado - Fado', 'Bossa Nova - Bossa Nova', 'Arte - Art', 'Museu - Museum']
                    },
                    {
                        'title': 'Portuguese Festivals',
                        'content': 'Learn about Carnival, Festa Junina, and other celebrations.',
                        'vocabulary': ['Festa - Party/Festival', 'Carnaval - Carnival', 'Natal - Christmas', 'Ano Novo - New Year']
                    }
                ]
            },
            {
                'title': 'Portuguese Tenses',
                'description': 'Master past and future tenses',
                'order': 2,
                'lessons': [
                    {
                        'title': 'Pretérito Perfeito (Simple Past)',
                        'content': 'Express completed past actions.',
                        'vocabulary': ['Eu falei - I spoke', 'Tu falaste/Você falou - You spoke', 'Ele falou - He spoke', 'Nós falamos - We spoke']
                    },
                    {
                        'title': 'Pretérito Imperfeito (Imperfect)',
                        'content': 'Express ongoing past actions and descriptions.',
                        'vocabulary': ['Eu falava - I was speaking', 'Tu falavas/Você falava - You were speaking', 'Ele falava - He was speaking']
                    },
                    {
                        'title': 'Future Tense',
                        'content': 'Talk about future plans and intentions.',
                        'vocabulary': ['Eu vou falar - I will speak', 'Tu vais/Você vai falar - You will speak', 'Ele vai falar - He will speak']
                    }
                ]
            }
        ]

        # Portuguese Advanced Courses
        advanced_courses = [
            {
                'title': 'Portuguese Literature',
                'description': 'Explore Portuguese and Brazilian literature',
                'order': 1,
                'lessons': [
                    {
                        'title': 'Portuguese Classic Literature',
                        'content': 'Read works by Camões, Eça de Queirós, and Pessoa.',
                        'vocabulary': ['Literatura - Literature', 'Poesia - Poetry', 'Romance - Novel', 'Poeta - Poet', 'Escritor - Writer']
                    },
                    {
                        'title': 'Brazilian Literature',
                        'content': 'Explore works by Machado de Assis and modern authors.',
                        'vocabulary': ['Conto - Short story', 'Crônica - Chronicle', 'Ensaio - Essay', 'Prosa - Prose']
                    }
                ]
            },
            {
                'title': 'Advanced Portuguese Grammar',
                'description': 'Master complex grammatical structures',
                'order': 2,
                'lessons': [
                    {
                        'title': 'Subjunctive Mood',
                        'content': 'Use the subjunctive for doubt, desire, and emotion.',
                        'vocabulary': ['Espero que - I hope that', 'Duvido que - I doubt that', 'É possível que - It\'s possible that']
                    },
                    {
                        'title': 'Conditional and Hypothetical',
                        'content': 'Express hypothetical situations and conditions.',
                        'vocabulary': ['Se eu fosse - If I were', 'Eu gostaria - I would like', 'Talvez - Maybe']
                    }
                ]
            }
        ]

        self.create_courses_for_level(beginner_level, beginner_courses)
        self.create_courses_for_level(intermediate_level, intermediate_courses)
        self.create_courses_for_level(advanced_level, advanced_courses)
        
        self.stdout.write(f'✅ Created Portuguese course structure')

    def create_courses_for_level(self, level, courses_data):
        """Helper method to create courses and lessons for a given level"""
        for course_data in courses_data:
            course, created = Course.objects.get_or_create(
                course_level=level,
                order=course_data['order'],
                defaults={
                    'title': course_data['title'],
                    'description': course_data['description'],
                    'is_active': True,
                    'estimated_duration': len(course_data['lessons']) * 15,
                    'passing_score': 80
                }
            )
            
            if created:
                self.stdout.write(f'  Created course: {course.title}')
                
                # Create lessons for the course
                for order, lesson_data in enumerate(course_data['lessons'], 1):
                    lesson = Lesson.objects.create(
                        course=course,
                        title=lesson_data['title'],
                        order=order,
                        estimated_duration=15,
                        is_active=True
                    )
                    
                    # Create content for the lesson
                    Content.objects.create(
                        lesson=lesson,
                        content_type='text',
                        text_content=lesson_data['content'],
                        vocabulary_list=lesson_data.get('vocabulary', []),
                        order=1
                    )
                    
                    self.stdout.write(f'    Created lesson: {lesson.title}')
