from django.db import models
from management.models import student_db
from .signals import application_trigger
from django.db.models.signals import post_save, pre_save # added


class complaints_db(models.Model):
    type_choices = [
        ('Room', 'Room Related'),
        ('Facility', 'Facilities Related'),
        ('Other', 'Other'),
    ]

    complaint_id = models.AutoField(primary_key=True,)
    roll_no = models.ForeignKey(student_db,on_delete=models.CASCADE, null=False, blank=False)
    complaint_title = models.CharField(max_length = 50,null = False)
    complaint_type = models.CharField(null = False, choices=type_choices, max_length=50)
    complaint_date = models.DateField(null=False)
    complaint_description = models.TextField(null=False, blank=False)
    complaint_image = models.ImageField(null = True)
    complaint_solved = models.BooleanField(default=False, null=False)

    def __str__(self):
        return str(self.complaint_title)
    class Meta:
        verbose_name = "Complaint "
        verbose_name_plural = "Complaints Managment"
		

class leave_application_db(models.Model):
	application_id = models.AutoField(primary_key=True)
	roll_no = models.ForeignKey(student_db,on_delete=models.CASCADE)
	reason = models.CharField(max_length=251,null = False)
	start_date = models.DateField() # end date > start date
	end_date = models.DateField()
	accepted = models.BooleanField(null = True, blank=True)
	
	def __unicode__(self):
		return str(self.roll_no)
	def __str__(self):
		return str(self.roll_no)

	class Meta:
		verbose_name = "Application"
		verbose_name_plural = "Applications Managment"

pre_save.connect(application_trigger,sender=leave_application_db)