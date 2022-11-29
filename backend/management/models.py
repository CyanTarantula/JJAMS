from django.db import models
from django.core.validators import MaxValueValidator,MinValueValidator
from phonenumber_field.modelfields import PhoneNumberField
from django.conf import settings
# doc for phonenumber_field available on https://pypi.org/project/django-phonenumber-field/


#to be hidden from admin page even.
class password_db(models.Model):
	roll_no = models.TextField(primary_key=True,null=False)
	password=models.CharField(null=False,max_length=160)

class student_db(models.Model):
	#primary_key.
	roll_no = models.CharField(primary_key=True,null=False, max_length=10)
	student_name = models.CharField(null=False,max_length = 80)
	programme = models.CharField(null=False, choices=settings.LIST_OF_PROGRAMMES, max_length=20)
	branch = models.CharField(null=False,max_length=80)
	semester = models.PositiveSmallIntegerField(null=False)
	contact_no = PhoneNumberField(null=False)
	email_id = models.EmailField(unique=True)
	guardian_contact = PhoneNumberField(null=False)
	age = models.PositiveSmallIntegerField(null=False)
	
	hostel_name = models.ForeignKey("hostel_db", on_delete=models.CASCADE, blank=False)
	
	photo = models.BinaryField(null=True)
	permanent_addr=models.TextField(null=False) 
	refund = models.IntegerField(default=0)
	room_no = models.IntegerField(null=False)
	
	def __unicode__(self):
		return str(self.roll_no)
	def __str__(self):
		return str(self.roll_no)
	class Meta:
		verbose_name="Student Detail"

# post_save.connect(Save_Password, sender=student_db)
		
class hostel_db(models.Model):
	# Primary key
	hostel_name=models.CharField(primary_key=True, null=False, choices = settings.LIST_OF_HOSTELS, max_length=25)
	no_of_rooms = models.PositiveSmallIntegerField(null=False)
	caretaker_contact = PhoneNumberField(null= False)
	# Foreign key.
	warden_id = models.ForeignKey("warden_db",on_delete=models.SET_NULL,null = True)
	
	def __unicode__(self):
		return str(self.hostel_name)
	def __str__(self):
		return str(self.hostel_name)
	class Meta:
		verbose_name="Hostel Detail"
		
class warden_db(models.Model):
	#primary_key.
	warden_id = models.CharField(primary_key=True, null=False, max_length=10)
	warden_name=models.CharField(null=False,blank=False,max_length=50)
	contact_no = PhoneNumberField(null=False)
	office_addr = models.TextField(max_length="200",null = False)
	email_id = models.EmailField(null=False,unique=True)
	chief_status = models.BooleanField(default = False)
	
	def __unicode__(self):
		return str(self.warden_id)
	def __str__(self):
		return str(self.warden_name)
	class Meta:
		verbose_name="Warden Detail"
"""
Class YourModel(models.Model):
    your_field = models.ForeignKey(YourOtherModel, db_constraint=False)
"""