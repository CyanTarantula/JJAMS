import { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './leaveApplicationForm.css'

import { userContext } from '../App';
import { backendUrl } from '../backendUrl';

function LeaveApplicationForm() {
    const loggedIn = localStorage.getItem("JJAMS_loggedIn");
    const rollNo = localStorage.getItem("JJAMS_roll_no");

    const navigate = useNavigate();

    useEffect(() => {
        if (loggedIn !== 'true') {
            navigate('/login');
        }
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            roll_no: rollNo,
            start_date: e.target.start_date.value,
            end_date: e.target.end_date.value,
            reason: e.target.reason.value,
        }

        console.log(JSON.stringify(data))

        let headers = new Headers();

        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');
        // headers.append('Authorization', 'Basic ' + base64.encode(username + ":" +  password));
        headers.append('Origin','http://localhost:3000');

        const requestOptions = {
            method: "POST",
            headers: headers,
            body: JSON.stringify(data)
        };

        fetch(`${backendUrl}/api/leave-applications/?roll_no=${rollNo}`, requestOptions)
            .then((response) => {
                console.log("Response: ", response);
                if (response.status !== 201) {
                    toast("Something went wrong");
                }
                return response.json();
            })
            .then((data) => {
                console.log("Data: ", data);
                toast("Leave application submitted successfully");
                // navigate("/");
            })
            .catch((error) => {
                console.log("Error: ", error);
                toast("Something went wrong");
            });
    }
    return (
        <div className="leave-application-form-container">
            <div className="leave-application-form-section">
                <div className="leave-application-form-title">
                    Leave Application Form
                </div>
                <form className="leave-application-form" onSubmit={handleSubmit}>
                    <label htmlFor="start_date">Start Date:</label>
                    <input type="date" id="leave-application-start_date" name="start_date" required />
                    
                    <label htmlFor="end_date">End Date:</label>
                    <input type="date" id="leave-application-end_date" name="end_date" required />

                    <label htmlFor="reason">Reason:</label>
                    <textarea id="leave-application-reason" name="reason" rows={4} />

                    <input type="submit" id="leave-application-submit" />
                </form>
            </div>
            <ToastContainer />
        </div>
    )
}

export default LeaveApplicationForm;
