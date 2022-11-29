import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './home.css';

import { userContext } from '../App';
import { backendUrl } from '../backendUrl';

function Home() {
    const loggedIn = localStorage.getItem("JJAMS_loggedIn");
    const rollNo = localStorage.getItem("JJAMS_roll_no");

    const [userData, setUserData] = useState({});

    let navigate = useNavigate();

    useEffect(() => {
        if (loggedIn !== 'true') {
            navigate('/login');
        }
        else {
            let headers = new Headers();

            headers.append('Content-Type', 'application/json');
            headers.append('Accept', 'application/json');
            // headers.append('Authorization', 'Basic ' + base64.encode(username + ":" +  password));
            headers.append('Origin','http://localhost:3000');
    
            const requestOptions = {
                method: "GET",
                headers: headers,
            };

            fetch(`${backendUrl}/api/students/?roll_no=${rollNo}`, requestOptions)
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
                try {
                    console.log("Data: ", data);
                    setUserData(data[0]);
                }
                catch (err) {
                    toast("Account not found");
                }
            })
            .catch((error) => {
                console.log("Error: ", error);
            });
        }
    }, []);

    return (
        <div className="home">
            <div className="home-title">
                Welcome to JJAMS!
            </div>
            <div className="home-section">
                <div className="home-section-title">
                    Personal Details
                </div>
                <div className="idcard-container">
                    <div className="idcard">
                        <div className="idcard-title">
                            ID Card
                        </div>
                        <div className="idcard-content">
                            <div className='idcard-content-left'>
                                <div className="idcard-content-name">
                                    Name: {userData.student_name}
                                </div>
                                <div className="idcard-content-rollno">
                                    Roll No: {userData.roll_no}
                                </div>
                                <div className="idcard-content-email">
                                    Email: {userData.email_id}
                                </div>
                            </div>
                            <div className='idcard-content-right'>
                                <div className="idcard-content-photo">
                                    <img src="https://www.w3schools.com/howto/img_avatar.png" />
                                </div>
                            </div>
                        </div>
                        <div className="idcard-footer">
                            <div className="idcard-footer-text">
                                This is a dummy ID card.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}

export default Home;