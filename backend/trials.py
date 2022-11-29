import requests

# api post request

# ## Student Account Creation
# url = "http://127.0.0.1:8000/api/students/"

# data = {
#     'roll_no' : 'B20CS029',
#     'student_name' : 'Tanmay Kulkarni',
#     'programme' : 'B.Tech',
#     'branch' : 'Computer Science',
#     'semester' : '5',
#     'contact_no' : '+919292929292',
#     'email_id' : 'kulkarni.x@iitj.ac.in',
#     'guardian_contact' : '+919876543210',
#     'age' : '20',
#     'permanent_addr' : 'IIT Jodhpur, Rajasthan, India',
#     'room_no' : '168',
#     'hostel_name' : 'G5',
# }


# r = requests.post(url = url, data = data)
# print(r.status_code)
# print(r.text)

# ## Student Account Creation - Password instance
# url = "http://127.0.0.1:8000/api/login/password/"

# data = {
#     'roll_no' : 'B20CS029',
#     'password' : '123456',
# }


# r = requests.post(url = url, data = data)
# print(r.status_code)
# print(r.text)

# ## Student Account Login
# url = "http://127.0.0.1:8000/api/login/password/"

# params = {
#     'roll_no' : 'B20AI042',
# }


# r = requests.get(url = url, params = params) # -> this result, if its empty = User account doesnt exist, else = User account exists and cross verify the entered and actual password to login
# print(r.status_code)
# print(r.text)

# ## Student Details

# url = "http://127.0.0.1:8000/api/students/"

# params = {
#     'roll_no' : 'B20AI042',
# }


# r = requests.get(url = url, params = params)
# print(r.status_code)
# print(r.text)

# ## Complaint Creation
# url = "http://127.0.0.1:8000/api/complaints/"

# data = {
#     'roll_no' : 'B20AI042',
#     'complaint_title' : 'Ac Not Working',
#     'complaint_type' : 'Room',
#     'complaint_date': '2022-11-29',
#     'complaint_description' : 'Well Well Well',
# }


# r = requests.post(url = url, data = data)
# print(r.status_code)
# print(r.text)

# ## Leave Application Creation
# url = "http://127.0.0.1:8000/api/leave-applications/"

# data = {
#     'roll_no' : 'B20AI042',
#     'reason' : 'Inter IIT',
#     'start_date' : '2022-11-25',
#     'end_date': '2022-11-28',
# }


# r = requests.post(url = url, data = data)
# print(r.status_code)
# print(r.text)

## Guard Entry Log
url = "http://127.0.0.1:8000/api/guards/"

data = {
    
}

r = requests.get(url = url, data = data)
print(r.status_code)
print(r.text)

# ## Guard Entry Log
# url = "http://127.0.0.1:8000/api/entrylog/"

# data = {
#     'guard_id' : '1',
#     'roll_no' : 'B20AI042',
#     'out_time': '2022-11-25',
#     'reason' : 'Ignus meet',
# }

# r = requests.post(url = url, data = data)
# print(r.status_code)
# print(r.text)