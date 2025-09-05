from django.contrib import admin
from .models import Language,Course,CourseEnrollment

# Register your models here.
admin.site.register(Language),
admin.site.register(Course),
admin.site.register(CourseEnrollment),