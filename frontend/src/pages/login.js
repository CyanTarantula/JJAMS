import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './login.css'

import { backendUrl } from '../backendUrl';

function Login() {
    let navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('JJAMS_loggedIn') === 'true') {
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

        fetch(`${backendUrl}/api/login/password/?roll_no=${data.roll_no}`, requestOptions)
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
                        window.location.href = "/";
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
                <form className="login-form" onSubmit={handleSubmit}>
                    <label htmlFor="roll_no">Roll No:</label>
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