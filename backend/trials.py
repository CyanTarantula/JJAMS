import requests

# api post request
url = "http://127.0.0.1:8000/api/students/"
data = {
    'roll_no' : 'B20AI050',
    'student_name' : 'Yash Bhargava',
    'programme' : 'B.Tech',
    'branch' : 'Artificial Intelligence',
    'semester' : '5',
    'contact_no' : '+919292929292',
    'email_id' : 'bhargava.x@iitj.ac.in',
    'guardian_contact' : '+919876543210',
    'age' : '20',
    'permanent_addr' : 'IIT Jodhpur, Rajasthan, India',
    'room_no' : '1',
    'hostel_name' : 'G5',
}

r = requests.post(url = url, data = data)
print(r.status_code)
print(r.text)
