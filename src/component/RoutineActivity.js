import Axios from "axios";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";

const RoutineActivity = ({ activity, deleteActivity, setUnauthorizedUserError, getRoutine, setSuccessfulMessage }) => {
    const [duration, setDuration] = useState(activity.duration);
    const [count, setCount] = useState(activity.count);

    const updateRoutineActivity = async (routineActivityId) => {
        const fields = {}
        if(duration && duration !== activity.duration){
            fields.duration = duration
        }
        if(count && count !== activity.count) {
            fields.count = count
        }
        if(Object.keys(fields).length) {
            setUnauthorizedUserError(false);
            setSuccessfulMessage(false);
            try{
                const response = await Axios.patch(`/api/routine_activities/${routineActivityId}`, {id:routineActivityId, ...fields},{
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${window.localStorage.getItem("fitness-tracker-token")}`
                    },
                })
                getRoutine();
                setSuccessfulMessage(true);
            } catch(error) {
                if(error.response.status === 403){
                    setUnauthorizedUserError(true);
                }
                console.error(error)
            }
        }
    }

    return (
        <div className="card routine-activity-card">
            <div className="card-body">
                <h5 className="card-title">{activity.name}</h5>
                <p className="card-text">{activity.description}</p>
                {
                    (useLocation().pathname.startsWith('/edit')) ?
                    <>
                    <div className="mb-3">
                    <label htmlFor="duration" className="form-label">Activity Duration</label>
                    <input className="form-control" id="duration" value={duration} onChange={(event) =>{
                        setDuration(event.target.value)
                    }}></input>
                </div>
                <div className="mb-3">
                    <label htmlFor="count" className="form-label">Activity Count</label>
                    <input className="form-control" id="count" value={count} onChange={(event) =>{
                        setCount(event.target.value)
                    }}></input>
                </div>
                    </>
                        :
                        <>
                        <p className="card-text">Duration: {activity.duration}</p>
                        <p className="card-text">Count: {activity.count}</p>
                        </>
                }
                
                {
                    (useLocation().pathname.startsWith('/edit')) ?
                    <>
                        <button className="btn btn-danger" onClick={() => deleteActivity(activity.routineActivityId)}>Delete Activity</button>
                        <button className="btn btn-primary" onClick={() =>updateRoutineActivity(activity.routineActivityId)}>Update Activity</button>
                        </>
                         :
                        null
                }

            </div>
        </div>
    )

};

export default RoutineActivity;