import { Link } from 'react-router-dom';

import './login.css'

function Login() {
    return (
        <div className="login">
            <div className="login-section">
                <div className="login-section-title">
                    Login
                </div>
                <form className="login-form">
                    <label htmlFor="username">Username:</label>
                    <input type="text" id="login-username" name="username" />
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="login-password" name="password" />
                    <Link to="/home" id="login-submit-btn" type="submit" value="Submit">
                        Submit
                    </Link>
                </form>
                <div className="login-signup">
                    Don't have an account? <Link to="/signup">Sign up</Link>
                </div>
            </div>
        </div>
    )
}

export default Login;