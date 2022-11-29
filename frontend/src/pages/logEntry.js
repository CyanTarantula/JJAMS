import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './logEntry.css';

import { backendUrl } from '../backendUrl';

function LogEntry() {
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
            roll_no: e.target.roll_no.value,
            guard_id: rollNo,
            out_time: e.target.time.value,
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

        fetch(`${backendUrl}/api/entrylog/`, requestOptions)
            .then((response) => {
                console.log("Response: ", response);
                if (response.status !== 201) {
                    // toast("Something went wrong");
                }
                return response.json();
            })
            .then((data) => {
                console.log("Data: ", data);
                toast("Log entry made successfully");
                // navigate("/");
            })
            .catch((error) => {
                console.log("Error: ", error);
                // toast("Something went wrong");
            });
    }

    return (
        <div className="log-entry">
            <div className="log-entry-section">
                <div className="log-entry-title">
                    Student Entry
                </div>
                <div className='log-entry-form-container'>
                    <form className='log-entry-form' onSubmit={handleSubmit}>
                        <label htmlFor="roll_no">Roll No.</label>
                        <input type="text" id="log-entry-roll_no" name="roll_no" />

                        <label htmlFor="time">Out Time:</label>
                        <input type="datetime-local" id="log-entry-time" name="time" />

                        <label htmlFor="reason">Reason:</label>
                        <textarea id="log-entry-reason" name="reason" rows={4} />
                        
                        <input type="submit" id="log-entry-submit" />
                    </form>
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}

export default LogEntry;