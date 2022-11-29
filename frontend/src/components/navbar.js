import { useState, useRef, useEffect, forwardRef } from 'react';
import { Link } from 'react-router-dom';

import './navbar.css'

import logo from "../assets/JJAMS-logos/JJAMS-logos.jpeg";

const optionsMap = {
    "Hide": [],
    "Login": [
        {name: "Logout", link: "/logout"}
    ],
    "Home": [
        {name: "Leave Application Form", link: "/leave-application-form"},
        {name: "Complaint Form", link: "/complaint-form"}
    ]
}

const NavbarDropdown = forwardRef((props, ref) => {
    return (
        <div className="navbar-dropdown" ref={ref} onMouseLeave={()=>{props.onMouseLeave()}}>
            {
                props.menuOptions.map((option, index) => {
                    if (option.name === "Logout") {
                        return (
                            <Link to={"/login"} key={index} className="navbar-dropdown-option"
                                onClick={() => {
                                    localStorage.removeItem("JJAMS_roll_no");
                                    localStorage.removeItem("JJAMS_loggedIn");
                                }}
                            >
                                {option.name}
                            </Link>
                        )
                    }
                    return (
                        <Link to={option.link} key={index} className="navbar-dropdown-option">
                            {option.name}
                        </Link>
                    )
                })
            }
        </div>
    )
});

function Navbar() {
    const loggedIn = localStorage.getItem("JJAMS_loggedIn") === "true";

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
                    {
                        loggedIn ? (
                            <Link to="/">
                                <img src={logo} />
                            </Link>
                        ) : (
                            <img src={logo} />
                        )
                    }
                </div>
                {
                    loggedIn && (
                        <Link 
                            to="/"
                            onMouseOver={() => {
                                updateMenuOptions("Login");
                            }}
                            onMouseLeave={(e) => {
                                handleMouseLeave(e);
                            }}
                        >
                            <div className="navbar-profile">
                                Profile
                            </div>
                        </Link>
                    )
                }
            </nav>
            {
                loggedIn &&
                <NavbarDropdown 
                    ref={dropDownRef}
                    menuOptions={menuOptions} 
                    onMouseLeave={(e) => {
                        updateMenuOptions("Hide");
                    }}
                />
            }
        </div>
    )
}

export default Navbar;