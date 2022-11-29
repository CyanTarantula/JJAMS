import { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './login.css'

import { userContext } from '../App';
import { backendUrl } from '../backendUrl';

function Login() {
    const loggedIn = localStorage.getItem("JJAMS_loggedIn");
    const rollNo = localStorage.getItem("JJAMS_roll_no");

    const [loginType, setLoginType] = useState("student");

    let navigate = useNavigate();

    useEffect(() => {
        if (loggedIn === 'true') {
            // window.location.href = '/home';
            navigate('/');
            // toast('You are already logged in!');
        }
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            roll_no: e.target.roll_no.value,
        }

        console.log(JSON.stringify(data))

        let headers = new Headers();

        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');
        // headers.append('Authorization', 'Basic ' + base64.encode(username + ":" +  password));
        headers.append('Origin','http://localhost:3000');

        const requestOptions = {
            method: "GET",
            headers: headers,
        };

        var requestURL = "";
        if (loginType === "student") {
            requestURL = `${backendUrl}/api/login/password/?roll_no=${data.roll_no}`;
        } else {
            requestURL = `${backendUrl}/api/guards/?Guard_ID=${data.roll_no}`;
        }

        fetch(requestURL, requestOptions)
            .then((response) => {
                console.log("Response: ", response);
                if (response.status === 200) {
                    console.log("Fetched successfully")
                }
                else {
                    toast("Invalid credentials");
                }
                return response.json();
            })
            .then((data) => {
                data = data[0];
                console.log("Data: ", data, e.target.password.value);
                try {
                    if (data.password == e.target.password.value) {
                        toast("Login successful");
                        localStorage.setItem('JJAMS_roll_no', data.roll_no);
                        localStorage.setItem('JJAMS_loggedIn', 'true');
                        console.log(localStorage.getItem('JJAMS_loggedIn'));
                        if (loginType === "student") {
                            window.location.href = "/";
                        }
                        else {
                            window.location.href = "/log-entry";
                        }
                    }
                    else {
                        toast("Invalid credentials");
                    }
                }
                catch (err) {
                    toast("Account not found");
                }
            })
            .catch((error) => {
                console.log("Error: ", error);
            });
    };

    return (
        <div className="login">
            <div className="login-section">
                <div className="login-section-title">
                    Login
                </div>
                <div className="login-type-radio" onChange={() => {
                    if (loginType === "student") {
                        setLoginType("teacher");
                    }
                    else {
                        setLoginType("student");
                    }
                }}>
                    <div className='login-type-radio-item'>
                        <input type="radio" id="login-type-student" name="login-type" value="student" defaultChecked />
                        <label htmlFor="login-type-student">Student</label>
                    </div>
                    <div className='login-type-radio-item'>
                        <input type="radio" id="login-type-guard" name="login-type" value="guard" />
                        <label htmlFor="login-type-guard">Guard</label>
                    </div>
                </div>
                <form className="login-form" onSubmit={handleSubmit}>
                    <label htmlFor="roll_no">
                        {
                            loginType === "student" ? "Roll No." : "Guard ID"
                        }
                    </label>
                    <input type="text" id="login-roll_no" name="roll_no" />
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="login-password" name="password" />
                    
                    <input type="submit" id="login-submit-btn" />
                </form>
                <div className="login-signup">
                    Don't have an account? <Link to="/signup">Sign up</Link>
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}

export default Login;