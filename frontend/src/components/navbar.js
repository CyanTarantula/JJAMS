import { useState, useRef, useEffect, forwardRef } from 'react';
import { Link } from 'react-router-dom';

import './navbar.css'

import logo from "../assets/JJAMS-logos/JJAMS-logos.jpeg";

const optionsMap = {
    "Hide": [],
    "Login": [
        {name: "Sign Up", link: "/signup"},
        {name: "Forgot Password", link: "/forgot-password"},
        {name: "Logout", link: "/logout"}
    ],
    "Home": [
        {name: "Dummy1", link: "/dummy1"},
        {name: "Dummy2", link: "/dummy2"},
        {name: "Dummy3", link: "/dummy3"}
    ]
}

const NavbarDropdown = forwardRef((props, ref) => {
    return (
        <div className="navbar-dropdown" ref={ref} onMouseLeave={()=>{props.onMouseLeave()}}>
            {
                props.menuOptions.map((option, index) => (
                    <Link to={option.link} key={index} className="navbar-dropdown-option">
                        {option.name}
                    </Link>
                ))
            }
        </div>
    )
});

function Navbar() {
    const dropDownRef = useRef(null);

    const [menuOptions,  setMenuOptions] = useState([]);

    const updateMenuOptions = (menuName) => {
        setMenuOptions(
            [
                ...optionsMap[menuName]
            ]
        )
    }

    const handleMouseLeave = (e) => {
        try {
            if (dropDownRef.current && !dropDownRef.current.contains(e.relatedTarget)) {
                updateMenuOptions("Hide");
            }
        }
        catch (err) {
            updateMenuOptions("Hide");
        } 
    }

    // updateMenuOptions("Home");

    return (
        <div className="navbar-container">
            <nav className="navbar">
                <div 
                    className="navbar-logo-name" 
                    onMouseOver={() => {
                        updateMenuOptions("Home");
                    }}
                    onMouseLeave={(e) => {
                        handleMouseLeave(e);
                    }}
                >
                    <Link to="/home">
                        <img src={logo} />
                    </Link>
                    {/* <div className="navbar-logo-name-text">
                        JJAMS
                    </div> */}
                </div>
                <Link 
                    to="/"
                    onMouseOver={() => {
                        updateMenuOptions("Login");
                    }}
                    onMouseLeave={(e) => {
                        handleMouseLeave(e);
                    }}
                >
                    <div className="navbar-login">
                        LOGIN
                    </div>
                </Link>
            </nav>
            <NavbarDropdown 
                ref={dropDownRef}
                menuOptions={menuOptions} 
                onMouseLeave={(e) => {
                    updateMenuOptions("Hide");
                }}
            />
        </div>
    )
}

export default Navbar;