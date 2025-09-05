from celery import shared_task
from django.core.mail import send_mail
from django.contrib.auth import get_user_model
from django.utils import timezone
from datetime import timedelta

User = get_user_model()

@shared_task
def send_daily_reminder():
    yesterday = timezone.now() - timedelta(days=1)
    users_to_remind = User.objects.filter(
        last_login__lt=yesterday,
        is_active=True
    )
    
    for user in users_to_remind:
        send_mail(
            subject="Don't break your learning streak!",
            message=f"Hi {user.username}, you haven't practiced today. Keep your streak alive!",
            from_email='noreply@polyglo.com',
            recipient_list=[user.email],
            fail_silently=True,
        )

@shared_task
def update_user_streaks():
    # Update streaks based on daily activity
    users = User.objects.all()
    for user in users:
        # Logic to update streaks based on lesson completions
        pass
