import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

const Register = ({ setIsLoggedIn }) => {
    const [usernameInput, setUsernameInput] = useState('');
    const [passwordOneInput, setPasswordOneInput] = useState('');
    const [passwordTwoInput, setPasswordTwoInput] = useState('');
    const [usernameTaken, setUsernameTaken] = useState(false);

    const navigate = useNavigate();

    const register = async (event) => {
        event.preventDefault();
        if (usernameInput && passwordOneInput && passwordOneInput === passwordTwoInput && passwordOneInput.length >= 8) {
            setUsernameTaken(false);
            try {
                const response = await axios.post('/api/users/register', {
                    username: usernameInput,
                    password: passwordOneInput
                }, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                if (response.data.error === 'UserTakenError') {
                    setUsernameTaken(true);
                } else {
                    window.localStorage.setItem("fitness-tracker-token", response.data.token);
                    setIsLoggedIn(true);
                    setUsernameInput('');
                    setPasswordOneInput('');
                    setPasswordTwoInput('');
                    navigate('/profile');
                }
                console.log(response);
            } catch (error) {
                console.error(error);
            };
        };
    };

    return (
        <>
            {
                (usernameTaken) ?
                    <p>Username already taken! Try something else</p> :
                    null
            }
            <form onSubmit={register}>
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
                    <label htmlFor="password-one" className="form-label">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password-one"
                        value={passwordOneInput}
                        onChange={(event) => setPasswordOneInput(event.target.value)
                        }>
                    </input>
                    {
                        (passwordOneInput && passwordOneInput.length < 8) ?
                            <div className="form-text">Password must be at least 8 characters.</div> :
                            null
                    }
                </div>
                <div className="mb-3">
                    <label htmlFor="password-two" className="form-label">Re-enter Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password-two"
                        value={passwordTwoInput}
                        onChange={(event) => setPasswordTwoInput(event.target.value)}>
                    </input>
                    {
                        (passwordOneInput !== passwordTwoInput) ?
                            <div class="form-text">Passwords must match!</div> :
                            null
                    }
                </div>
                <p>Already signed up? <Link to='/login'>Click here!</Link></p>
                <button type="submit" className="btn btn-primary">Register</button>
            </form >
        </>
    )
}

export default Register;