from django.contrib import admin
from .models import complaints_db,leave_application_db

# Register your models here.
class complaintsadmin(admin.ModelAdmin):
	list_display = ('roll_no','complaint_type','complaint_date','complaint_solved')
	list_filter = ('complaint_type','complaint_solved','complaint_date')
	
class applicationadmin(admin.ModelAdmin):
	list_display = ('roll_no','start_date','end_date','accepted')
	list_filter = ('start_date','end_date','accepted','roll_no')

admin.site.register(complaints_db,complaintsadmin)
admin.site.register(leave_application_db,applicationadmin)