from threading import Thread
from entrylog import models
from django.contrib.auth.hashers import make_password

def DB_Save_Detect(sender,instance,**kwargs):
    if sender == models.EntryLog:
        if instance.in_time != None:
            try:
                defaulter_inst = models.Defaulters.objects.get(entry_id=instance.entry_id)
                defaulter_inst.delete()
            except:
                pass
            # t_in_date = instance.in_date
            # t_out_date = instance.out_date
            # t_regn_no = instance.regn_no
            # t_reason = instance.reason
            # Final_inst = models.Entry_Exit(regn_no=t_regn_no,out_date=t_out_date,in_date=t_in_date,reason=t_reason)
            # Final_inst.save()
            # instance.delete()
		
def Guard_Password_Manager(sender,instance,**kwargs):
    if sender == models.Guard_Detail:
        hashed_password = make_password(str(instance.Password))
        instance.Password= hashed_password
        #instance.save()
        # no need to call save as it was already called and that is why we are heres
