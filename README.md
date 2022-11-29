# JJAMS
## JJAMS - JJAMS Just Another (Hostel)Management System

This is a Student Hostel management system made keeping in mind the uasability in IIT Jodhpur Hostels. The project includes seperate backend and frontend directories. 

## Steps to set up locally

### Backend

First navigate to the Backend directory using
```
cd backend
```
<hr>
Now, create a virtual environment, you can do so in the following 2 ways:

- Using Python venv setup. After creating a virtual environment for the project, simply install the requirements using 
  ```
  pip install -r requirements.txt
  ```

- Another simple way is using the Python ***pipenv*** module. To do so :
  - Install `pipenv` for dependency management
      ```
      pip install pipenv
      ```
  - Use pipenv to install other dependencies from `Pipfile`
      ```
      pipenv install --dev
      ```
  - Activate the new virtual environment
      ```
      pipenv shell
      ```

<hr>

Now do the following steps to run the backend on your system.

- Make database migrations
    ```
    python manage.py makemigrations
    python manage.py migrate
    ```
- Create a superuser (one time step, do this only while running the backend for the first time)
    ```
    python manage.py createsuperuser
    ```
- Run development server on localhost
    ```
    python manage.py runserver :8000
    ```
  - Optionally you can run the backend to allow access from any device connected to the same wifi, for this
      First identify your IP address from the ipv4 section obtained after running the following command 
      ```
      ipconfig
      ```
      Then,
      ```
      python manage.py runserver 0.0.0.0:8000
      ```
      You can now access the server from any device on same wifi network by using the url - ```http://<your ip address>:8000/```
