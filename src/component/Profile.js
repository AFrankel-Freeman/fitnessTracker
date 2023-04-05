import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";


const Profile = () =>{
    const [profile, setProfile] = useState([]);

    const getProfile = async() => {
        try{
            const user = await Axios.get("/api/users/me", {
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${window.localStorage.getItem("fitness-tracker-token")}`
                }
            })
                    const response = await Axios.get(`/api/users/${user.data.username}/routines`)
                    setProfile(response.data)
            } catch(error){
                console.error(error);
            }
    }
    
    useEffect(() => {
        
        getProfile()
    },[])

    const deleteRoutine = async(routineId) => {
        try{
            const response = await fetch(`/api/routines/${routineId}`,{
                method: 'DELETE',
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${window.localStorage.getItem("fitness-tracker-token")}`
                }
            })
            getProfile();
        } catch(error){
            console.error(error);
        }
    }

    return(
        <>
        <div className="routines">
        {
            profile.map((routine, i) =>{
                return(
                    <div className="card routine-card" key={i}>
                        <div className="card-body">
                            <h5 className="card-title">{routine.name}</h5>
                            <h6 className="card-subtitle mb-2 text-body-secondary">{routine.creatorName}</h6>
                            <p className="card-text">{routine.goal}</p>
                                <h5 className="card-title">Activities:</h5>
                                {
                                    routine.activities.map((activity, i) => {
                                        return(
                                            <div className="card routine-activity-card" key={i}>
                                            <div className="card-body">
                                                <h5 className="card-title">{activity.name}</h5>
                                                <p className="card-text">{activity.description}</p>
                                                <p className="card-text">Duration: {activity.duration}</p>
                                                <p className="card-text"> Count: {activity.count}</p>
                                            </div>
                                        </div>
                                        )
                                    })
                                }
                                <button className="btn btn-danger" onClick={()=>deleteRoutine(routine.id)}>Delete Routine</button>
                                <Link className="btn btn-primary" to={`/edit/${routine.id}`}>Edit Routine </Link>
                        </div>
                    </div>
                )
            })
        }
        </div>
    </>
    )
}

export default Profile;