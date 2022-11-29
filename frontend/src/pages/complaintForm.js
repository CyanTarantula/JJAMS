import { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './complaintForm.css'

import { userContext } from '../App';
import { backendUrl } from '../backendUrl';

function ComplaintForm() {
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
            complaint_title: e.target.title.value,
            complaint_type: e.target.type.value,
            complaint_date: e.target.date.value,
            complaint_description: e.target.description.value,
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

        fetch(`${backendUrl}/api/complaints/?roll_no=${rollNo}`, requestOptions)
            .then((response) => {
                console.log("Response: ", response);
                if (response.status !== 201) {
                    toast("Something went wrong");
                }
                return response.json();
            })
            .then((data) => {
                console.log("Data: ", data);
                toast("Complaint submitted successfully");
                // navigate("/");
            })
            .catch((error) => {
                console.log("Error: ", error);
                toast("Something went wrong");
            });
    }
    return (
        <div className="complaint-form-container">
            <div className="complaint-form-section">
                <div className="complaint-form-title">
                    Complaint Form
                </div>
                <form className="complaint-form" onSubmit={handleSubmit}>
                    <label htmlFor="date">Date:</label>
                    <input type="date" id="complaint-date" name="date" required />
                    
                    <div className="complaint-type-dropdown">
                        <label htmlFor="type" className='complaint-type-dropdown-label'>Complaint Type:</label>
                        <select name="type" id="complaint-type" required>
                            <option className='complaint-type-option' value="Room">Room Related</option>
                            <option className='complaint-type-option' value="Facility">Facilities Related</option>
                            <option className='complaint-type-option' value="Other">Other</option>
                        </select>
                    </div>
                    
                    <label htmlFor="title">Title:</label>
                    <input type="text" id="complaint-title" name="title" required />

                    <label htmlFor="description">Description:</label>
                    <textarea id="complaint-description" name="description" rows={4} />

                    <input type="submit" id="complaint-submit" />
                </form>
            </div>
            <ToastContainer />
        </div>
    )
}

export default ComplaintForm;