from django.core.validators import MaxValueValidator
from django.db import models
from management.models import student_db
from django.db.models.signals import post_save,pre_save # added
from .signals import DB_Save_Detect,Guard_Password_Manager
from django.utils import timezone
from phonenumber_field.modelfields import PhoneNumberField

class EntryLog(models.Model):
    entry_id = models.AutoField(primary_key=True,null=False)
    guard_id = models.ForeignKey('Guard_Detail',on_delete=models.CASCADE)
    roll_no = models.ForeignKey(student_db,on_delete=models.CASCADE)
    out_time = models.DateTimeField(null=False, default=timezone.now)
    in_time = models.DateTimeField(null=True, blank=True)
    reason = models.CharField(max_length=200,null = False)

    def __str__(self):
        return str(self.entry_id)
    class Meta:
        verbose_name="Entry Log"
        verbose_name_plural="Entry Exit Details"


post_save.connect(DB_Save_Detect,sender=EntryLog)

	
class Guard_Detail(models.Model):
	Guard_Id = models.AutoField(primary_key=True,null=False)
	Guard_Name = models.CharField(null=False,max_length = 80)
	Contact_No = PhoneNumberField(null=False)
	password = models.CharField(null=False,max_length=160)
	
	def __str__(self):
		return str(self.Guard_Id)
		
	class Meta:
		verbose_name = "Guard Details"
		verbose_name_plural = "Guards Details"
		
class Defaulters(models.Model):
	entry_id = models.OneToOneField(EntryLog, on_delete=models.CASCADE, primary_key=True)
	student = models.ForeignKey(student_db,on_delete=models.CASCADE)
	is_resolved = models.BooleanField(default=False)
	reason = models.CharField(max_length=200,null = True, blank=True)

	def __str__(self):
		return str(self.entry_id)
	
	class Meta:
		verbose_name= "Defaulter"
		verbose_name_plural = "Defaulters"
