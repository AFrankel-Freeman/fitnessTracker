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
                <Link className="headerlink." to="/">Home</Link>
                <Link className="headerlink" to ="/routines">Routines</Link>
                <Link className="headerLink" to ="/activities">Activities</Link>
                {
                    isLoggedIn?
                        <Link to="/profile">My Activities</Link>:
                        <Link to=""></Link> 
                }

                { 
                    isLoggedIn ?
                    <Link className="headerlink" to="/" onClick= {logout}>Logout</Link> :
                    <Link className="headerLink" to="/login">Login/Register</Link> 
                }
            </div>
        </header>
    </div>
    )
}

export default Header;