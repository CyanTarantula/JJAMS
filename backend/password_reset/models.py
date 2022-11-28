from django.db import models
from django.core.validators import MaxValueValidator,MinValueValidator


class reset_pswd_db(models.Model):
	roll_no = models.IntegerField(null=False)
	timestamp = models.DateTimeField()
	token0 = models.CharField(max_length=35,null = True)
	def __unicode__(self):
		return str(self.regn_no)
	def __str__(self):
		return str(self.regn_no)