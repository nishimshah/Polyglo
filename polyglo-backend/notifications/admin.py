from django.contrib import admin
from .models import Notification,ReminderSettings
# Register your models here.
admin.site.register(Notification),
admin.site.register(ReminderSettings),