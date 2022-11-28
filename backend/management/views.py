from django.shortcuts import render,redirect
from django.http import HttpResponse
from .models import password_db,student_db,hostel_db
from .hash_password import password_db_writer
from django.contrib.auth.hashers import check_password
from PIL import Image
from django.urls import reverse
import requests
# from rest_framework.permissions import AllowAny
# from rest_framework.views import APIView
# from rest_framework.response import Response
# from django.contrib.auth.models import User
# from rest_framework.authentication import TokenAuthentication
# from rest_framework import generics, status
# from .serializers import UserSerializer, RegisterSerializer, UserProfileSerializer, EventRegistrationSerializer
# from .models import UserProfile, EventRegistration, Event





#Add logic to automatically add +91 to the number instead of asking the user.
#Add server side form verification bcz html can be cracked by using inspect.
# def index(request):
# 	return render(request,'home/home_page.html',{'flag':0})
	
# can be included in index as if request.method == 'POST'

# class StudentRegistrationView(View):



def password_check(request):
	if request.method == 'POST':
		id = request.POST.get('userid')
		try :
			stud_inst = student_db.objects.get(regn_no=id)
		except student_db.DoesNotExist:
			return HttpResponse("<h2>The entered roll no does not exist.<br> try signing up.</h2>")
			
		password_entered = request.POST.get('password')
		try:
			id_instatnce = password_db.objects.get(user_id=id)
			if check_password(password_entered,id_instatnce.password):
			# need to verify if student or warden.
				request.session['selected_student_id'] = id
				#request.session.set_expiry(0)
				return redirect('/home/student/')
			else: 
				return render(request,'home/home_page.html',{'flag':1,'message':"Wrong password try again."})
				# return HttpResponse("<h2>Wrong password try again.</h2>")
			# if the entered id is not found by try block.
		except password_db.DoesNotExist:
			return render(request,'home/home_page.html',{'flag':1,'message':"Wrong ID please try again."})
			# return HttpResponse("<h2>Not found the form details please try again.</h2>")	
	else:
		return HttpResponse("<h2>Invalid request please try again</h2>")

def signup(request):
	if request.method =='GET':
		return render(request,'home/sign_up.html')
		
	elif request.method =='POST':
		# data extraction from populated form.
		name =request.POST.get('name')
		id = request.POST.get('regn_no')
		# Check if entry already exist.
		
		try:# if the student is already present in the database
			student_inst = student_db.objects.get(regn_no=id)
			return HttpResponse("<h2>The entry for this registration number already exists.<br>Contact admin for more information.</h2>")
			
		except student_db.DoesNotExist:
			password = request.POST.get('password')
			c_password = request.POST.get('confirm_password')
			if str(password) != str(c_password):
				return HttpResponse("<h2>The entered password do not match</h2>")
			else:
					name = request.POST.get('name')
					branch_entered = request.POST.get('branch')
					email = request.POST.get('usermail')
					hostel = request.POST.get('hostel')
					student_no = request.POST.get('student_no')
					semester_entered = request.POST.get('semester')
					age_entered = request.POST.get('age')
					guardian_no = request.POST.get('guardian_no')
					#resizing the image for security and reducing storage.
					photo = Image.open(request.FILES['photo'])
					size = (350,350)
					photo = photo.resize(size,Image.ANTIALIAS)
					bdata=photo.tobytes()
					address = request.POST.get('address')
					
					try:# ALSO IF STUD EXISTS U WILL RECREATE
						#if the PASSWORD OF user was ALREADY CREATED (say the admin deleterd the entry)
						pass_inst = password_db.objects.get(user_id=id)
						pass_inst.delete()
					except password_db.DoesNotExist:
						# try:
						stud_inst = student_db(regn_no=id,student_name=name,branch = branch_entered,semester=semester_entered,contact_no = student_no,email_id = email,guardian_contact = guardian_no,age = age_entered,hostel_name= hostel_db.objects.get(hostel_name=hostel),photo=bdata,premanent_addr = address)
						stud_inst.save()

						if password_db_writer(id,password):
							
							return HttpResponse("<h2>Id created successfully. go back to home page</h2>")
						else:
							instance_Student = student_db.objects.get(regn_no=id)
							instance_Student.delete()
							return HttpResponse("<h2> Password creation unsucessfull .<br> Please try again. </h2>")
						#Hostel does not exist or any other problem.
						# except:
							# return HttpResponse("<h2> The Id was not created.<br>Try again or contact admin.</h2>")
					
	return HttpResponse("<h2>Form submitted.</h2>")



# from django.urls import reverse
# from rest_framework.permissions import AllowAny
# from rest_framework.views import APIView
# from rest_framework.response import Response
# from .serializers import UserSerializer, RegisterSerializer, UserProfileSerializer, EventRegistrationSerializer
# from django.contrib.auth.models import User
# from rest_framework.authentication import TokenAuthentication
# from rest_framework import generics, status
# from .models import UserProfile, EventRegistration, Event
# import requests


# class UserDetailAPI(APIView):
#     authentication_classes = (TokenAuthentication,)
#     permission_classes = (AllowAny,)

#     def get(self, request, *args, **kwargs):
#         user = User.objects.get(id=request.user.id)
#         serializer = UserSerializer(user)
#         return Response(serializer.data)


# class RegisterUserAPIView(generics.CreateAPIView):
#     permission_classes = (AllowAny,)
#     serializer_class = RegisterSerializer

#     def create(self, request, *args, **kwargs):
#         user = User.objects.create(
#             username=request.data['email'],
#             email=request.data['email'],
#             first_name=request.data['first_name'],
#             last_name=request.data['last_name']
#         )

#         user.set_password(request.data['password'])
#         user.save()

#         r = requests.post(
#             url=request.build_absolute_uri(reverse('login')),
#             data={
#                 'username': request.data['email'],
#                 'password': request.data['password']
#             }
#         )

#         res = {
#             'message': 'User created successfully',
#             'token': r.json()['token'],
#             'email': user.email
#         }

#         return Response(res, status=status.HTTP_201_CREATED)


# class UserProfileAPIView(generics.CreateAPIView):
#     authentication_classes = (TokenAuthentication,)
#     permission_classes = (AllowAny,)
#     serializer_class = UserProfileSerializer

#     def create(self, request, *args, **kwargs):
#         user = User.objects.get(id=request.user.id)
#         userprofile = UserProfile.objects.create(
#             user=user,
#             phone=request.data['phone'],
#             gender=request.data['gender'],
#             current_year=request.data['current_year'],
#             college=request.data['college'],
#             address=request.data['address'],
#             state=request.data['state'],
#             accommodation_required=request.data['accommodation_required']
#         )
#         userprofile.save()

#         return Response({"message": "User Profile Created Successfully", "uuid": userprofile.uuid}, status=status.HTTP_201_CREATED)


# class UserProfileDetailsView(generics.RetrieveAPIView):
#     authentication_classes = (TokenAuthentication,)
#     permission_classes = (AllowAny,)
#     serializer_class = UserProfileSerializer

#     def get(self, request, *args, **kwargs):
#         user = User.objects.get(id=request.user.id)
#         userprofile = UserProfile.objects.get(user=user)
#         userserializer = UserSerializer(user)
#         userprofileserializer = UserProfileSerializer(userprofile)

#         return Response({"user": userserializer.data, "userprofile": userprofileserializer.data})


# class EventRegistrationAPIView(generics.CreateAPIView):
#     authentication_classes = (TokenAuthentication,)
#     permission_classes = (AllowAny,)
#     serializer_class = EventRegistrationSerializer

#     def create(self, request, *args, **kwargs):
#         eventid = request.data['eventid']
#         registration = EventRegistration.objects.create(
#             user=User.objects.get(id=request.user.id),
#             event=Event.objects.get(unique_id=eventid),
#         )

#         registration.save()

#         return Response({'message': 'Event Registration successful'}, status=status.HTTP_201_CREATED)


# class EventRegistrationsDetailsView(generics.RetrieveAPIView):
#     authentication_classes = (TokenAuthentication,)
#     permission_classes = (AllowAny,)
#     serializer_class = EventRegistrationSerializer

#     def get(self, request, *args, **kwargs):
#         user = User.objects.get(id=request.user.id)
#         try:
#             event = Event.objects.get(unique_id=request.query_params['eventid'])
#         except Event.DoesNotExist:
#             return Response({"detail": 'InValid Event'})
#         try:
#             registraion = EventRegistration.objects.get(user=user, event=event)
#         except EventRegistration.DoesNotExist:
#             return Response({"detail": 'InValid Registration'})
        
#         eventregistration = EventRegistrationSerializer(registraion)
#         return Response({"registration": eventregistration.data, "detail": 'Valid Token'})


# class EventRegistrationAttendanceAPIView(generics.RetrieveUpdateAPIView):
#     authentication_classes = (TokenAuthentication,)
#     permission_classes = (AllowAny,)
#     serializer_class = EventRegistrationSerializer

#     def post(self, request):
#         eventid = request.data['eventid']
#         user = User.objects.get(id=request.user.id)
#         event = Event.objects.get(unique_id=eventid)
#         attendance = request.data['attendace']
#         EventRegistration.objects.filter(user=user, event=event).update(attendance=attendance)

#         return Response({'message': 'Attendace Updated successfully'}, status=status.HTTP_201_CREATED)
