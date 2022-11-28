from threading import Thread
import facilities
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from django.conf import settings
from smtplib import SMTP

def application_trigger(sender,instance,**kwargs):
    """
    RUNS IN SEP. THREAD Result : NO
    """ 
    if sender == facilities.models.leave_application_db:
        if instance.accepted == None:
        # 	instance.accepted = False
        # 	instance.declined = False
        # 	instance.save()
        # 	raise ValueError("You can't set 'accept' and 'declined' true at same time.\n This is not possible.\n The entry is saved without being accepted or rejected.")
        # else:
            print(f"Leave Application for {instance.roll_no.student_name} sent for review.")
            # t1 = Thread(target = Mailer, args= (instance,))
            # t1.start()
        elif instance.accepted:
            print(f"Leave Application for {instance.roll_no.student_name} accepted.")
        else:
            print(f"Leave Application for {instance.roll_no.student_name} denied.")

                
def Mailer(instance):
    mail = SMTP('smtp.gmail.com',587)
    mail.starttls()
    mail.ehlo()

    reciever = instance.roll_no.email_id
    mail.login(settings.MAIL_ID,settings.MAIL_PASS)
    message=MIMEMultipart('alternative')
    sender = settings.MAIL_ID
    message['From'] = "Hostel Managment System"
    message['To'] = reciever
    message['Subject']="Notification For leave application"
    mess = "Dear "+str(instance.reg_no.student_name)+",\n\n" 

    if instance.accepted == None:
        mess+="A request for your leave starting on " +str(instance.start_date)+" to "+str(instance.end_date)+"has been recieved. \n Kindly keep patience while it is being reviewed.\nIf you have any further queries kindly contact hostel warden or admin.\n\n\n Greetings,\n Hostel Managment Team\n"
    elif instance.accepted:
        mess += "We are happy to inform you that your request for leave starting on " +str(instance.start_date)+" to "+str(instance.end_date)+" has been accepted  by the hostel incharge.\n As a result you will be entitled for a refund in mess money for the stated dates.\nThank you, for your time.\n If you have any further queries please feel free to contact the administrator.\n\n\n Greetings,\n Hostel Managment Team\n"
        
    elif not instance.accepted:
        mess += "We regret to inform you that your request for leave (and henceforth mess refund) starting on " +str(instance.start_date)+" to "+str(instance.end_date)+" has been declined by the hostel incharge\nAs a result you will 'NOT' be entitled for a refund in mess money for the stated dates.\n If you have any further queries please feel free to contact the administrator.\n\n\n Greetings,\n Hostel Managment Team\n"
        instance.delete()

    message.attach(MIMEText(mess,'plain'))
    mail.sendmail(sender,reciever, message.as_string())
    mail.quit()	

