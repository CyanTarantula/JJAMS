import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import './App.css';

import Navbar from './components/navbar';
import Login from './pages/login';
import Home from "./pages/home";

function App() {

  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
