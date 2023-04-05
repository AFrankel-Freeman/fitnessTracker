import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";

const AllRoutines = () =>{
    const [routineData, setRoutineData] = useState([]);

    useEffect(() => {
        const getAllPublicRoutines = async() => {
            try{
                const response = await Axios.get("/api/routines");
                setRoutineData(response.data)
            } catch(error){
                console.error(error)
            };
        }
        getAllPublicRoutines();
    },[]);

    return(
        <>
            <div className="routines">
                <Link className="btn btn-primary" to="/newroutine">Create New Routines</Link>
            {
                routineData.map((routine, i) =>{
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
                            </div>
                        </div>
                    )
                })
            }
            </div>
        </>
    )
}

export default AllRoutines;