from django.contrib import admin
from .models import Defaulters,EntryLog,Guard_Detail


class DefaultersAdmin(admin.ModelAdmin):
	list_display = ('entry_id','student','is_resolved','reason')
	list_filter = ('entry_id', 'student', 'is_resolved')

class EntryLogadmin(admin.ModelAdmin):
	list_display = ('entry_id', 'roll_no', 'out_time', 'in_time', 'guard_id', 'reason')
	list_filter = ('entry_id', 'out_time', 'in_time', 'roll_no')
	date_hierarchy = 'out_time'
	search_fields = ('roll_no__roll_no','reason') # since reg_no is a foreign key therefore nameoffield__nameoffieldinfktable

class Guard_Detailadmin(admin.ModelAdmin):
	list_display = ('Guard_Id','Guard_Name','Contact_No')

	
admin.site.register(Defaulters,DefaultersAdmin)
admin.site.register(EntryLog,EntryLogadmin)
admin.site.register(Guard_Detail,Guard_Detailadmin)