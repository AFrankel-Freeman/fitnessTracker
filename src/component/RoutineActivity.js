import React from "react";
import { useLocation } from "react-router-dom";

const RoutineActivity = ({ activity, deleteActivity }) => {

    return (
        <div className="card routine-activity-card">
            <div className="card-body">
                <h5 className="card-title">{activity.name}</h5>
                <p className="card-text">{activity.description}</p>
                <p className="card-text">Duration: {activity.duration}</p>
                <p className="card-text">Count: {activity.count}</p>
                {
                    (useLocation().pathname.startsWith('/edit')) ?
                        <button className="btn btn-danger" onClick={() => deleteActivity(activity.routineActivityId)}>Delete Activity</button> :
                        null
                }

            </div>
        </div>
    )

};

export default RoutineActivity;