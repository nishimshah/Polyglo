
from django.db import models
from django.contrib.auth import get_user_model
from django.core.validators import MinValueValidator, MaxValueValidator
from django.db.models import Sum, Count, Q

User = get_user_model()

class Language(models.Model):
    name = models.CharField(max_length=100)
    code = models.CharField(max_length=10, unique=True)
    description = models.TextField(blank=True)
    flag_image = models.ImageField(upload_to='flags/', blank=True, null=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ['name']
        indexes = [
            models.Index(fields=['code']),
            models.Index(fields=['is_active']),
        ]

class CourseLevel(models.Model):
    """Represents different levels within a language (Beginner, Intermediate, Advanced)"""
    DIFFICULTY_CHOICES = [
        ('beginner', 'Beginner'),
        ('intermediate', 'Intermediate'),
        ('advanced', 'Advanced'),
    ]

    language = models.ForeignKey(Language, on_delete=models.CASCADE, related_name='levels')
    difficulty = models.CharField(max_length=20, choices=DIFFICULTY_CHOICES)
    title = models.CharField(max_length=200)
    description = models.TextField()
    order = models.IntegerField(default=1)
    cover_image = models.URLField(blank=True, null=True)
    is_active = models.BooleanField(default=True)
    estimated_duration = models.PositiveIntegerField(default=1, help_text="Estimated hours to complete")
    required_previous_level = models.ForeignKey(
        'self', 
        on_delete=models.CASCADE, 
        null=True, 
        blank=True,
        help_text="Previous level that must be completed before this one"
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ['language', 'difficulty']
        ordering = ['language', 'order']
        indexes = [
            models.Index(fields=['language', 'order']),
            models.Index(fields=['difficulty']),
            models.Index(fields=['is_active']),
        ]

    def __str__(self):
        return f"{self.language.name} - {self.get_difficulty_display()}"

    @property
    def total_lessons(self):
        """Get total lessons across all courses in this level"""
        total = 0
        for course in self.courses.filter(is_active=True):
            total += course.total_lessons
        return total

    @property
    def total_courses(self):
        """Get total number of courses in this level"""
        return self.courses.filter(is_active=True).count()

    @property
    def estimated_duration_hours(self):
        """Get estimated duration for completing this level"""
        total_duration = self.courses.filter(is_active=True).aggregate(
            total=Sum('estimated_duration')
        )['total'] or 0
        return round(total_duration / 60, 1)

    def get_user_progress(self, user):
        """Get user's progress in this level"""
        try:
            return LevelEnrollment.objects.get(user=user, course_level=self)
        except LevelEnrollment.DoesNotExist:
            return None

    def is_accessible_for_user(self, user):
        """Check if user can access this level (previous level completed)"""
        if not self.required_previous_level:
            return True
        
        return LevelEnrollment.objects.filter(
            user=user,
            course_level=self.required_previous_level,
            completed_at__isnull=False
        ).exists()

class Course(models.Model):
    """Individual courses within a course level"""
    title = models.CharField(max_length=200)
    description = models.TextField()
    course_level = models.ForeignKey(
        CourseLevel, 
        on_delete=models.CASCADE, 
        related_name='courses',
        null=True,
        blank=True
    )
    order = models.IntegerField(default=1)
    cover_image = models.URLField(blank=True, null=True)
    is_premium = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    estimated_duration = models.IntegerField(
        default=60,
        help_text="Duration in minutes"
    )
    xp_reward = models.IntegerField(default=100, help_text="XP points awarded upon completion")
    passing_score = models.IntegerField(
        default=80, 
        validators=[MinValueValidator(0), MaxValueValidator(100)],
        help_text="Minimum percentage score to complete course"
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['course_level', 'order']
        indexes = [
            models.Index(fields=['course_level', 'order']),
            models.Index(fields=['is_active']),
            models.Index(fields=['is_premium']),
        ]

    def __str__(self):
        if self.course_level:
            return f"{self.course_level.language.name} - {self.title}"
        return self.title

    @property
    def total_lessons(self):
        """Get total number of lessons in this course"""
        return getattr(self, 'lessons', None) and self.lessons.filter(is_active=True).count() or 0

    @property  
    def language(self):
        """Get the language of this course"""
        return self.course_level.language if self.course_level else None

    @property
    def difficulty(self):
        """Get the difficulty of this course"""
        return self.course_level.difficulty if self.course_level else None

    @property
    def average_rating(self):
        """Get average rating for this course"""
        if hasattr(self, 'ratings'):
            ratings = self.ratings.filter(is_active=True)
            if ratings.exists():
                total = sum(r.rating for r in ratings)
                return round(total / ratings.count(), 1)
        return 4.5  # Default rating

    @property
    def total_ratings(self):
        """Get total number of ratings"""
        if hasattr(self, 'ratings'):
            return self.ratings.filter(is_active=True).count()
        return 0

    def get_user_enrollment(self, user):
        """Get user's enrollment in this course"""
        try:
            return CourseEnrollment.objects.get(user=user, course=self)
        except CourseEnrollment.DoesNotExist:
            return None

    def is_enrolled(self, user):
        """Check if user is enrolled in this course"""
        return CourseEnrollment.objects.filter(user=user, course=self).exists()

class CourseEnrollment(models.Model):
    """User enrollment in individual courses"""
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='course_enrollments')
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='enrollments')
    enrolled_at = models.DateTimeField(auto_now_add=True)
    completed_at = models.DateTimeField(null=True, blank=True)
    last_accessed = models.DateTimeField(null=True, blank=True)
    progress_percentage = models.FloatField(
        default=0.0,
        validators=[MinValueValidator(0.0), MaxValueValidator(100.0)]
    )
    best_score = models.FloatField(
        default=0.0,
        validators=[MinValueValidator(0.0), MaxValueValidator(100.0)]
    )
    attempts_count = models.IntegerField(default=0)
    
    class Meta:
        unique_together = ['user', 'course']
        ordering = ['-enrolled_at']
        indexes = [
            models.Index(fields=['user', 'course']),
            models.Index(fields=['completed_at']),
            models.Index(fields=['enrolled_at']),
            models.Index(fields=['last_accessed']),
        ]

    def __str__(self):
        return f"{self.user.username} - {self.course.title}"

    @property
    def is_completed(self):
        return self.completed_at is not None and self.best_score >= self.course.passing_score

    @property
    def is_passed(self):
        """Check if user has passed the course"""
        return self.best_score >= self.course.passing_score

    @property
    def completion_status(self):
        """Get human-readable completion status"""
        if self.is_completed:
            return "Completed"
        elif self.progress_percentage > 0:
            return "In Progress"
        else:
            return "Not Started"

    def update_progress(self, new_score=None):
        """Update progress and handle completion"""
        if new_score is not None:
            self.attempts_count += 1
            if new_score > self.best_score:
                self.best_score = new_score
        
        # Mark as completed if passed and not already completed
        if self.is_passed and not self.completed_at:
            from django.utils import timezone
            self.completed_at = timezone.now()
            
            # Update level enrollment progress
            level_enrollment = LevelEnrollment.objects.filter(
                user=self.user,
                course_level=self.course.course_level
            ).first()
            
            if level_enrollment:
                level_enrollment.calculate_progress()
                
                # Move to next course
                next_course = level_enrollment.next_course
                if next_course:
                    level_enrollment.current_course = next_course
                    level_enrollment.save()
        
        self.save()

    def update_last_accessed(self):
        """Update the last accessed timestamp"""
        from django.utils import timezone
        self.last_accessed = timezone.now()
        self.save(update_fields=['last_accessed'])

    def get_grade_letter(self):
        """Get letter grade based on best score"""
        if self.best_score >= 90:
            return 'A'
        elif self.best_score >= 80:
            return 'B'
        elif self.best_score >= 70:
            return 'C'
        elif self.best_score >= 60:
            return 'D'
        else:
            return 'F'
    
    @property
    def time_since_last_access(self):
        """Get human-readable time since last access"""
        if not self.last_accessed:
            return "Never accessed"
        
        from django.utils import timezone
        from datetime import timedelta
        
        now = timezone.now()
        diff = now - self.last_accessed
        
        if diff < timedelta(hours=1):
            minutes = diff.seconds // 60
            return f"{minutes} minute{'s' if minutes != 1 else ''} ago"
        elif diff < timedelta(days=1):
            hours = diff.seconds // 3600
            return f"{hours} hour{'s' if hours != 1 else ''} ago"
        else:
            days = diff.days
            return f"{days} day{'s' if days != 1 else ''} ago"

class LevelEnrollment(models.Model):
    """User enrollment in a course level (Beginner, Intermediate, Advanced)"""
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='level_enrollments')
    course_level = models.ForeignKey(CourseLevel, on_delete=models.CASCADE, related_name='enrollments')
    enrolled_at = models.DateTimeField(auto_now_add=True)
    completed_at = models.DateTimeField(null=True, blank=True)
    progress_percentage = models.FloatField(
        default=0.0,
        validators=[MinValueValidator(0.0), MaxValueValidator(100.0)]
    )
    current_course = models.ForeignKey(Course, on_delete=models.SET_NULL, null=True, blank=True)
    
    class Meta:
        unique_together = ['user', 'course_level']
        ordering = ['-enrolled_at']
        indexes = [
            models.Index(fields=['user', 'course_level']),
            models.Index(fields=['completed_at']),
        ]

    def __str__(self):
        return f"{self.user.username} - {self.course_level}"

    @property
    def is_completed(self):
        return self.completed_at is not None

    @property
    def next_course(self):
        """Get the next course the user should take"""
        if not self.current_course:
            return self.course_level.courses.filter(is_active=True).order_by('order').first()
        
        return self.course_level.courses.filter(
            is_active=True,
            order__gt=self.current_course.order
        ).order_by('order').first()

    def calculate_progress(self):
        """Calculate progress based on completed courses"""
        total_courses = self.course_level.courses.filter(is_active=True).count()
        if total_courses == 0:
            return 0
        
        completed_courses = CourseEnrollment.objects.filter(
            user=self.user,
            course__course_level=self.course_level,
            completed_at__isnull=False
        ).count()
        
        progress = (completed_courses / total_courses) * 100
        self.progress_percentage = min(progress, 100.0)
        
        if progress >= 100 and not self.completed_at:
            from django.utils import timezone
            self.completed_at = timezone.now()
            self.create_certificate()
        
        self.save()
        return self.progress_percentage

    def create_certificate(self):
        """Create a certificate when level is completed"""
        if not self.is_completed:
            return None
            
        course_enrollments = CourseEnrollment.objects.filter(
            user=self.user,
            course__course_level=self.course_level
        )
        
        if course_enrollments:
            avg_score = sum(e.best_score for e in course_enrollments) / len(course_enrollments)
        else:
            avg_score = 80.0
            
        certificate, created = Certificate.objects.get_or_create(
            user=self.user,
            course_level=self.course_level,
            defaults={'final_score': avg_score}
        )
        return certificate

class Certificate(models.Model):
    """Certificates awarded upon level completion"""
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='certificates')
    course_level = models.ForeignKey(CourseLevel, on_delete=models.CASCADE, related_name='certificates')
    issued_at = models.DateTimeField(auto_now_add=True)
    certificate_id = models.CharField(max_length=100, unique=True)
    final_score = models.FloatField(
        validators=[MinValueValidator(0.0), MaxValueValidator(100.0)]
    )
    
    class Meta:
        unique_together = ['user', 'course_level']
        ordering = ['-issued_at']
        indexes = [
            models.Index(fields=['user']),
            models.Index(fields=['certificate_id']),
            models.Index(fields=['issued_at']),
        ]

    def __str__(self):
        return f"Certificate: {self.user.username} - {self.course_level}"

    @property
    def user_name(self):
        """Get user's full name or username"""
        if self.user.first_name and self.user.last_name:
            return f"{self.user.first_name} {self.user.last_name}"
        return self.user.username

    @property
    def language_name(self):
        """Get the language name"""
        return self.course_level.language.name

    @property
    def difficulty_level(self):
        """Get the difficulty level"""
        return self.course_level.get_difficulty_display()

    @property
    def certificate_url(self):
        """Generate certificate URL"""
        return f"/certificates/{self.certificate_id}/"

    def save(self, *args, **kwargs):
        if not self.certificate_id:
            import uuid
            self.certificate_id = f"POLYGLO-{self.course_level.language.code.upper()}-{self.course_level.difficulty.upper()}-{str(uuid.uuid4())[:8]}"
        super().save(*args, **kwargs)

class CourseRating(models.Model):
    """User ratings and reviews for courses"""
    RATING_CHOICES = [
        (1, '1 Star'),
        (2, '2 Stars'), 
        (3, '3 Stars'),
        (4, '4 Stars'),
        (5, '5 Stars'),
    ]
    
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='course_ratings')
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='ratings')
    rating = models.IntegerField(choices=RATING_CHOICES)
    review = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_active = models.BooleanField(default=True)
    
    class Meta:
        unique_together = ['user', 'course']
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['course', 'is_active']),
            models.Index(fields=['rating']),
            models.Index(fields=['created_at']),
        ]
    
    def __str__(self):
        return f"{self.user.username} - {self.course.title} - {self.rating} stars"

    @property
    def rating_display(self):
        """Get rating with star display"""
        return "⭐" * self.rating

    @property
    def is_positive(self):
        """Check if rating is positive (4+ stars)"""
        return self.rating >= 4
