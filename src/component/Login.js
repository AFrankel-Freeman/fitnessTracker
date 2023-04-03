import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const Login = ({ setIsLoggedIn }) => {
    const [usernameInput, setUsernameInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');
    const [invalidLogin, setInvalidLogin] = useState(false);

    const navigate = useNavigate();

    const logIn = async (event) => {
        event.preventDefault();
        if (usernameInput && passwordInput) {
            setInvalidLogin(false);
            try {
                const response = await axios.post('/api/users/login', {
                    username: usernameInput,
                    password: passwordInput
                }, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                if (response.data.error === 'IncorrectCredentialsError') {
                    setInvalidLogin(true);
                } else {
                    window.localStorage.setItem("fitness-tracker-token", response.data.token);
                    setIsLoggedIn(true);
                    setUsernameInput('');
                    setPasswordInput('');
                    navigate('/profile');
                }
            } catch (error) {
                console.error(error);
            };
        };
    };

    return (
        <>
            {
                (invalidLogin) ?
                    <p>Incorrect username or password. Try again.</p> :
                    null
            }
            <form onSubmit={logIn}>
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">Username</label>
                    <input
                        className="form-control"
                        id="username"
                        value={usernameInput}
                        onChange={(event) => setUsernameInput(event.target.value)}>
                    </input>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        value={passwordInput}
                        onChange={(event) => setPasswordInput(event.target.value)}>
                    </input>
                </div>
                <button type="submit" className="btn btn-primary">Log In</button>
            </form>
        </>
    )
}

export default Login;