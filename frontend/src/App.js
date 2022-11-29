import { useState, useEffect, createContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import './App.css';

import Navbar from './components/navbar';

import Login from './pages/login';
import Signup from "./pages/signup";
import Home from "./pages/home";

import ComplaintForm from "./pages/complaintForm";

export const userContext = createContext();

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
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

            <Route path="/complaint-form" element={<ComplaintForm />} />
          </Routes>
        </div>
      </Router>
    </userContext.Provider>
  );
}

export default App;
