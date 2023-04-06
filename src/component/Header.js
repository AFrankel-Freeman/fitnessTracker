import React from "react";
import {Link} from "react-router-dom";

const Header = ({isLoggedIn, setIsLoggedIn}) =>{

    const token = window.localStorage.getItem("fitness-tracker-token")

    const logout =() => {
        window.localStorage.removeItem("fitness-tracker-token");
        setIsLoggedIn(false);
    };

    return(
        <div>
        <header>
            <span className ="logo">Fitness Tracker</span>
            <div className="headerlinks">
                <Link className="btn btn-primary" to="/">Home</Link>
                <Link className="btn btn-primary" to ="/routines">Routines</Link>
                <Link className="btn btn-primary" to ="/activities">Activities</Link>
                {
                    isLoggedIn?
                        <Link className="btn btn-primary" to="/profile">My Routines</Link>:
                        <Link to=""></Link> 
                }

                { 
                    isLoggedIn ?
                    <Link className="btn btn-primary" to="/" onClick= {logout}>Logout</Link> :
                    <Link className="btn btn-primary" to="/login">Login/Register</Link> 
                }
            </div>
        </header>
    </div>
    )
}

export default Header;