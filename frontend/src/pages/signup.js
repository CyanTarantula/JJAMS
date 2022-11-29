import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './signup.css'

import { backendUrl } from '../backendUrl';

// Signup page with form of roll_no, student_name, programme, branch, semester, contact_no, email_id, guardian_contact, age, hostel_name, photo, permanent_addr, room_no
function Signup() {
    const handleSubmit = (e) => {
        e.preventDefault();
        if (e.target.password.value !== e.target.confirm_password.value) {
            // alert("Passwords do not match");
            toast("Passwords do not match");
        }
        else {
            const data = {
                roll_no: e.target.roll_no.value,
                student_name: e.target.student_name.value,
                programme: e.target.programme.value,
                branch: e.target.branch.value,
                semester: e.target.semester.value,
                contact_no: e.target.contact_no.value,
                email_id: e.target.email_id.value,
                guardian_contact: e.target.guardian_contact.value,
                age: e.target.age.value,
                hostel_name: e.target.hostel.value,
                // photo: e.target.photo.value,
                permanent_addr: e.target.permanent_addr.value,
                room_no: e.target.room_no.value,
            };
            console.log(data);

            const data2 = {
                roll_no: e.target.roll_no.value,
                password: e.target.password.value,
            }

            let headers = new Headers();

            headers.append('Content-Type', 'application/json');
            headers.append('Accept', 'application/json');
            // headers.append('Authorization', 'Basic ' + base64.encode(username + ":" +  password));
            headers.append('Origin','http://localhost:3000');

            const requestOptions = {
                method: "POST",
                headers: headers,
                body: JSON.stringify(data),
            };

            const requestOptions2 = {
                method: "POST",
                headers: headers,
                body: JSON.stringify(data2),
            }

            fetch(`${backendUrl}/api/students/`, requestOptions)
                .then((response) => {
                    console.log("Response: ", response);
                    if (response.status === 201) {                        
                        fetch(`${backendUrl}/api/login/password/`, requestOptions2)
                            .then((response2) => {
                                console.log("Response2: ", response2);
                                if (response2.status === 201) {
                                    window.location.href = "/";
                                }
                                else {
                                    // alert("Error signing up");
                                    toast("Error signing up");
                                }
                            })
                    } else if (response.status === 409) {
                        toast("User already exists");
                        window.location.href = "/";
                    } else {
                        // alert("Invalid credentials");
                        toast("Invalid credentials");
                        // window.location.href = "/signup";
                    }
                    return response.json();
                })
                .then((data) => {
                    console.log("Data: ", data);
                })
                .catch((error) => {
                    console.log("Error: ", error);
                });
        }
    };

    return (
        <div className="signup">
            <div className="signup-section">
                <div className="signup-section-title">
                    Signup
                </div>
                <form className="signup-form" onSubmit={handleSubmit}>
                    <label htmlFor="roll_no">Roll No:</label>
                    <input type="text" id="signup-roll_no" name="roll_no" maxLength={10} required />

                    <label htmlFor="student_name">Student Name:</label>
                    <input type="text" id="signup-student_name" name="student_name" maxLength={80} required />

                    <div className="signup-programme-dropdown">
                        <label htmlFor="programme" className='signup-programme-dropdown-label'>Programme:</label>
                        <select name="programme" id="signup-programme" required>
                            <option className='signup-programme-option' value="B.Tech">B.Tech</option>
                            <option className='signup-programme-option' value="M.Tech">M.Tech</option>
                            <option className='signup-programme-option' value="MBA">MBA</option>
                            <option className='signup-programme-option' value="PhD">PhD</option>
                        </select>
                    </div>

                    <label htmlFor="branch">Branch:</label>
                    <input type="text" id="signup-branch" name="branch" required />
                    <label htmlFor="semester">Semester:</label>
                    <input type="text" id="signup-semester" name="semester" required />
                    <label htmlFor="contact_no">Contact No:</label>
                    <input type="text" id="signup-contact_no" name="contact_no" required />
                    <label htmlFor="email_id">Email ID:</label>
                    <input type="text" id="signup-email_id" name="email_id" />
                    <label htmlFor="guardian_contact">Guardian Contact:</label>
                    <input type="text" id="signup-guardian_contact" name="guardian_contact" required />
                    <label htmlFor="age">Age:</label>
                    <input type="text" id="signup-age" name="age" required />

                    <div className="signup-hostel-dropdown">
                        <label htmlFor="hostel" className='signup-hostel-dropdown-label'>Hostel Name:</label>
                        <select name="hostel" id="signup-hostel" required>
                            <option className='signup-hostel-option' value="B1">B1</option>
                            <option className='signup-hostel-option' value="B2">B2</option>
                            <option className='signup-hostel-option' value="B3">B3</option>
                            <option className='signup-hostel-option' value="B4">B4</option>
                            <option className='signup-hostel-option' value="B5">B5</option>
                            <option className='signup-hostel-option' value="G1">G1</option>
                            <option className='signup-hostel-option' value="G2">G2</option>
                            <option className='signup-hostel-option' value="G3">G3</option>
                            <option className='signup-hostel-option' value="G4">G4</option>
                            <option className='signup-hostel-option' value="G5">G5</option>
                            <option className='signup-hostel-option' value="G6">G6</option>
                            <option className='signup-hostel-option' value="I2">I2</option>
                            <option className='signup-hostel-option' value="I3">I3</option>
                            <option className='signup-hostel-option' value="Y4">Y4</option>
                        </select>
                    </div>

                    {/* <label htmlFor="photo">Photo:</label>
                    <input type="file" id="signup-photo" name="photo" accept='image/*' /> */}

                    <label htmlFor="permanent_addr">Permanent Address:</label>
                    <input type="text" id="signup-permanent_addr" name="permanent_addr" required />

                    <label htmlFor="room_no">Room No:</label>
                    <input type="text" id="signup-room_no" name="room_no" required />

                    <label htmlFor="password">Set Password:</label>
                    <input type="password" id="signup-password" name="password" required
                        onKeyUp={() => {
                            let passEle = document.getElementById('signup-password');
                            let confPassEle = document.getElementById('signup-confirm_password');
                            if (confPassEle.value != "") {
                                if (passEle.value == confPassEle.value) {
                                    confPassEle.style.borderColor = 'green';
                                    confPassEle.style.borderWidth = '3px';
                                } else {
                                    confPassEle.style.borderColor = 'red';
                                    confPassEle.style.borderWidth = '3px';
                                }
                            }
                        }}
                    />

                    <label htmlFor="confirm_password">Confirm Password:</label>
                    <input type="password" id="signup-confirm_password" name="confirm_password" required
                        onKeyUp={() => {
                            let passEle = document.getElementById('signup-password');
                            let confPassEle = document.getElementById('signup-confirm_password');
                            if (passEle.value != "") {
                                if (passEle.value == confPassEle.value) {
                                    confPassEle.style.borderColor = 'green';
                                    confPassEle.style.borderWidth = '3px';
                                } else {
                                    confPassEle.style.borderColor = 'red';
                                    confPassEle.style.borderWidth = '3px';
                                }
                            }
                        }}
                    />

                    <input type="Submit" id="signup-submit-btn" />
                </form>
                <div className="signup-login">
                    Already have an account? <Link to="/login">Login</Link>
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}

export default Signup;