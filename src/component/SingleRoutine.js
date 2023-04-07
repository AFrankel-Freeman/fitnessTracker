import React from 'react';
import { Link, useLocation } from "react-router-dom";
import RoutineActivity from './RoutineActivity';

const SingleRoutine = ({ routine, getProfile }) => {

    const deleteRoutine = async (routineId) => {
        try {
            await fetch(`/api/routines/${routineId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${window.localStorage.getItem("fitness-tracker-token")}`
                }
            })
            getProfile();
        } catch (error) {
            console.error(error);
        };
    };

    return (
        <div className="card routine-card">
            <div className="card-body">
                <h5 className="card-title">{routine.name}</h5>
                <h6 className="card-subtitle mb-2 text-body-secondary">{routine.creatorName}</h6>
                <p className="card-text">{routine.goal}</p>
                <h5 className="card-title">Activities:</h5>
                {
                    routine.activities.map((activity, i) => {
                        return (
                            <RoutineActivity activity={activity} key={i} />
                        )
                    })
                }
                {
                    (useLocation().pathname === '/profile') ?
                        <>
                            < button className="btn btn-danger delete-routine-button" onClick={() => deleteRoutine(routine.id)}>Delete Routine</button>
                            <Link className="btn btn-primary" to={`/edit/${routine.id}`}>Edit Routine </Link>
                        </> :
                        null
                }
            </div>
        </div >
    );
};

export default SingleRoutine;