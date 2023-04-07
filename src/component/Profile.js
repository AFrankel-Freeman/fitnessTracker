import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import SingleRoutine from "./SingleRoutine";



const Profile = () => {
    const [profile, setProfile] = useState([]);

    const getProfile = async () => {
        try {
            const user = await Axios.get("/api/users/me", {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${window.localStorage.getItem("fitness-tracker-token")}`
                }
            })
            const response = await Axios.get(`/api/users/${user.data.username}/routines`)
            setProfile(response.data)
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getProfile()
    }, [])

    return (
        <>
            <div className="routines">
            <Link className="btn btn-primary" to="/newroutine">Create New Routine</Link>
                {
                    profile.map((routine, i) => {
                        return (
                            <SingleRoutine routine={routine} getProfile={getProfile} key={i} />
                        )
                    })
                }
            </div>
        </>
    )
}

export default Profile;