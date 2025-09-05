from django.contrib import admin
from .models import DailyActivity,UserProgress
# Register your models here.
admin.site.register(DailyActivity),
admin.site.register(UserProgress),