import requests

# api post request
url = "http://127.0.0.1:8000/api/students/"

data = {
    'roll_no' : 'B20CS029',
    'student_name' : 'Tanmay Kulkarni',
    'programme' : 'B.Tech',
    'branch' : 'Computer Science',
    'semester' : '5',
    'contact_no' : '+919292929292',
    'email_id' : 'kulkarni.x@iitj.ac.in',
    'guardian_contact' : '+919876543210',
    'age' : '20',
    'permanent_addr' : 'IIT Jodhpur, Rajasthan, India',
    'room_no' : '168',
    'hostel_name' : 'G5',
}


r = requests.post(url = url, data = data)
print(r.status_code)
print(r.text)

url = "http://127.0.0.1:8000/api/login/password/"

data = {
    'roll_no' : 'B20CS029',
    'password' : '123456',
}


r = requests.post(url = url, data = data)
print(r.status_code)
print(r.text)