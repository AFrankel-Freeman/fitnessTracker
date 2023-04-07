import Axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import RoutineActivity from "./RoutineActivity";

const EditRoutine = ({ activityData }) => {
    const [editRoutine, setEditRoutine] = useState({});
    const [goal, setGoal] = useState("");
    const [ name, setName] = useState("");
    const [isPublic, setIsPublic] = useState(false);
    const [selectedActivityId, setSelectedActivityId] = useState(0);
    const [duration, setDuration] = useState("");
    const [count, setCount] = useState("");
    const [unauthorizedUserError, setUnauthorizedUserError] = useState(false);
    const [duplicateRoutineActivity, setDuplicateRoutineActivity] = useState(false);
    const [successfulMessage, setSuccessfulMessage] = useState(false)
    const { routineId } = useParams();

    const getRoutine = async () => {
        try {
            const response = await Axios.get(`/api/routines/${routineId}`)
            setEditRoutine(response.data);
        } catch (error) {
            console.error(error);
        };
    };

    const setValues = () => {
        if (editRoutine && Object.keys(editRoutine).length) {
            setName(editRoutine.name)
            setGoal(editRoutine.goal);
            setIsPublic(editRoutine.isPublic);
        };
    };

    useEffect(() => {
        getRoutine();
        setValues();
    }, [])

    useEffect(() => {
        setValues();
    }, [editRoutine])

    const editRoutineData = async (event) => {
        event.preventDefault();
        setSuccessfulMessage(false);
        const fields = {}
        if (name && name !== editRoutine.name) {
            fields.name = name
        };
        if (goal && goal !== editRoutine.goal) {
            fields.goal = goal
        };
        if (isPublic !== editRoutine.isPublic) {
            fields.isPublic = isPublic
        };
        if (Object.keys(fields).length) {
            setUnauthorizedUserError(false);
            try {
                const response = await Axios.patch(`/api/routines/${routineId}`, fields, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${window.localStorage.getItem("fitness-tracker-token")}`
                    },
                });
                setSuccessfulMessage(true);
                getRoutine();
            } catch (error) {
                if (error.response.status === 403) {
                    setUnauthorizedUserError(true);
                }
                console.error(error)
            };
        }
    };

    const deleteActivity = async (routineActivityId) => {
        try {
            const response = await fetch(`/api/routine_activities/${routineActivityId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${window.localStorage.getItem("fitness-tracker-token")}`
                },
            });
            const result = await response.json();
            if (result.error === 'unauthorizedDeleteError') {
                setUnauthorizedUserError(true);
            } else {
                getRoutine();
            }
        } catch (error) {
            console.error(error);
        }
    };

    const addActivity = async (event) => {
        event.preventDefault();
        setUnauthorizedUserError(false);
        setDuplicateRoutineActivity(false);
        if (selectedActivityId !== "0" && count && duration && Number(count) && Number(duration)) {
            try {
                const response = await Axios.post(`/api/routines/${routineId}/activities`, {
                    activityId: selectedActivityId,
                    count,
                    duration
                }, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${window.localStorage.getItem("fitness-tracker-token")}`
                    },
                });
                if (response.data.error === "unauthorizedUpdateError") {
                    setUnauthorizedUserError(true);
                } else if (response.data.error === "duplicateRoutineActivityError") {
                    setDuplicateRoutineActivity(true);
                } else {
                    getRoutine();
                    setDuration("");
                    setCount("");
                }
            } catch (error) {
                console.error(error)
            }
        }
    };

    return (
        <div className="edit-routine-form">
            {
                (unauthorizedUserError) ?
                    <p>You may not edit a routine that is not registered to user</p> :
                    null
            }
            {
                (successfulMessage) ?
                    <p>Routine Updated</p> :
                    null
            }
            <form onSubmit={editRoutineData} className="edit-routine-details-form">
                {
                    (Object.keys(editRoutine).length) ?
                        <h5>{editRoutine.name}</h5> :
                        null
                }
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Routine Name</label>
                    <input className="form-control" id="name" value={name} onChange={(event) =>{
                        setName(event.target.value)
                    }}></input>
                </div>
                <div className="mb-3">
                    <label htmlFor="goal" className="form-label">Routine Goal</label>
                    <input className="form-control" id="goal" value={goal} onChange={(event) => {
                        setGoal(event.target.value)
                    }}></input>
                </div>
                <div className="form-check">
                    <input className="form-check-input" type="checkbox" checked={isPublic} id="isPublic" onChange={(event) => {
                        setIsPublic(event.target.checked)
                    }}></input>
                    <label className="form-check-label" htmlFor="isPublic">Public</label>
                </div>
                <button type="submit" className="btn btn-primary edit-routine-button">Edit Routine Details</button>
            </form>
            {
                (Object.keys(editRoutine).length) ?
                    editRoutine.activities.map((activity, i) => {
                        return (
                            <RoutineActivity 
                            activity={activity} deleteActivity={deleteActivity} 
                            setUnauthorizedUserError={setUnauthorizedUserError} setSuccessfulMessage = {setSuccessfulMessage} 
                            getRoutine={getRoutine} key={i} 
                            />
                        )
                    }) :
                    null
            }
            {
                (duplicateRoutineActivity) ?
                    <p>Activity Already Exists in Routine</p> :
                    null
            }
            <form onSubmit={addActivity} className="add-activity-form">
                <select className="form-select activity-select" onChange={(event) => {
                    setSelectedActivityId(event.target.value)
                }}>
                    <option value="0">Select Activity to Add</option>
                    {
                        activityData.length ?
                            activityData.map((activity, i) => {
                                return (
                                    <option value={activity.id} key={i}>{activity.name}</option>)
                            }) :
                            null
                    }
                </select>
                <div className="mb-3">
                    <label htmlFor="duration" className="form-label">Activity Duration</label>
                    <input className="form-control" id="goal" value={duration} onChange={(event) => {
                        setDuration(event.target.value)
                    }}></input>
                </div>
                <div className="mb-3">
                    <label htmlFor="count" className="form-label">Activity Count</label>
                    <input className="form-control" id="count" value={count} onChange={(event) => {
                        setCount(event.target.value)
                    }}></input>
                </div>
                <button type="submit" className="btn btn-primary">Add Activity</button>
            </form>
        </div>
    )
}
export default EditRoutine;