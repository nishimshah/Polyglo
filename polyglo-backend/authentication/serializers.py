
from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password

User = get_user_model()

class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, validators=[validate_password])
    password_confirm = serializers.CharField(write_only=True)
    
    class Meta:
        model = User
        fields = ('username', 'email', 'password', 'password_confirm', 
                 'native_language', 'learning_languages', 'daily_goal')
    
    def validate(self, attrs):
        if attrs['password'] != attrs['password_confirm']:
            raise serializers.ValidationError("Passwords don't match")
        return attrs
    
    def create(self, validated_data):
        validated_data.pop('password_confirm')
        password = validated_data.pop('password')
        user = User.objects.create_user(**validated_data)
        user.set_password(password)  # This was missing in your code
        user.save()
        return user

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'native_language', 'learning_languages', 
                 'daily_goal', 'current_streak', 'longest_streak', 'total_xp', 'avatar',
                 'total_study_time', 'lessons_completed_count', 'quizzes_completed_count', 
                 'flashcards_reviewed_count', 'created_at')
        read_only_fields = ('id', 'current_streak', 'longest_streak', 'total_xp', 
                           'total_study_time', 'lessons_completed_count', 
                           'quizzes_completed_count', 'flashcards_reviewed_count', 'created_at')
