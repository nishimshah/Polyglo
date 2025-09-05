from rest_framework import serializers
from .models import Lesson, LessonCompletion

class LessonSerializer(serializers.ModelSerializer):
    is_completed = serializers.SerializerMethodField()
    
    class Meta:
        model = Lesson
        fields = '__all__'
    
    def get_is_completed(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            return LessonCompletion.objects.filter(
                user=request.user, 
                lesson=obj
            ).exists()
        return False

class LessonCompletionSerializer(serializers.ModelSerializer):
    lesson = serializers.StringRelatedField()
    
    class Meta:
        model = LessonCompletion
        fields = '__all__'
