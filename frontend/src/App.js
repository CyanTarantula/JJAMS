import { useState, useEffect, createContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import './App.css';

import Navbar from './components/navbar';

import Login from './pages/login';
import Signup from "./pages/signup";
import Home from "./pages/home";

import ComplaintForm from "./pages/complaintForm";
import LeaveApplicationForm from "./pages/leaveApplicationForm";

import LogEntry from "./pages/logEntry";

export const userContext = createContext();

function App() {
  const [loggedIn, setLoggedIn] = useState("");
  const [rollNo, setRollNo] = useState("");

  useEffect(() => {
    if (localStorage.getItem("JJAMS_loggedIn") === "true") {
      const roll_no = localStorage.getItem("JJAMS_roll_no");
      setRollNo(roll_no);
      setLoggedIn(true);
    }
  }, []);

  return (
    <userContext.Provider value={{ loggedIn, setLoggedIn, rollNo, setRollNo }}>
      <Router>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            <Route path="/leave-application-form" element={<LeaveApplicationForm />} />
            <Route path="/complaint-form" element={<ComplaintForm />} />

            <Route path="/log-entry" element={<LogEntry />} />
          </Routes>
        </div>
      </Router>
    </userContext.Provider>
  );
}

export default App;
