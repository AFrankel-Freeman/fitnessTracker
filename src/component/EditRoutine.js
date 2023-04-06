import Axios from "axios";
import { ge } from "faker/lib/locales";
import React, { useState, useEffect } from "react";
import {useParams} from 'react-router-dom';

const EditRoutine = ({activityData}) =>{
    const [editRoutine, setEditRoutine] = useState({});
    const { routineId } = useParams();
    const [ goal, setGoal ] = useState("");
    const [ isPublic, setIsPublic ] = useState(false);
    const [ selectedActivityId, setSelectedActivityId ] = useState(0);
    const [ duration, setDuration ] = useState("");
    const [ count, setCount ] = useState("");
    const [unauthorizedUserError, setUnauthorizedUserError] = useState(false);
    const [duplicateRoutineActivity, setDuplicateRoutineActivity] = useState(false);

    const getRoutine = async() => {
        try{
            const response = await Axios.get(`/api/routines/${routineId}`)
            setEditRoutine(response.data);
        } catch(error) {
            console.error(error);
        }
    }
    const setValues= () =>{if(editRoutine && Object.keys(editRoutine).length){
        setGoal(editRoutine.goal);
        setIsPublic(editRoutine.isPublic);
    }
    }
    useEffect(() => {
        getRoutine();
        setValues();
    },[])

    useEffect(() => {
        setValues();
    }, [editRoutine])

    const editRoutineData = async (event) =>{
        event.preventDefault();
        const fields = {}
        if(goal && goal !== editRoutine.goal){
            fields.goal=goal
        };
        if(isPublic !== editRoutine.isPublic){
            fields.isPublic=isPublic
        };
        if(Object.keys(fields).length){
            setUnauthorizedUserError(false);
            try{
                const response = await Axios.patch(`/api/routines/${routineId}`, fields, {
                    headers:{
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${window.localStorage.getItem("fitness-tracker-token")}`
                    },
                });
            getRoutine();        
            } catch(error){
                if(error.response.status === 401){
                    setUnauthorizedUserError(true);
                }
                console.error(error)
            };
        }
    };
    const addActivity = async (event) => {
        event.preventDefault();
        setUnauthorizedUserError(false);
        setDuplicateRoutineActivity(false);
        if(selectedActivityId !== "0" && count && duration){
            try{
                const response = await Axios.post(`/api/routines/${routineId}/activities`,{
                    activityId : selectedActivityId, count:count, duration:duration
                },{
                    headers:{
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${window.localStorage.getItem("fitness-tracker-token")}`
                    },
                })
                if(response.data.error === "unauthorizedUpdateError"){
                    setUnauthorizedUserError(true);
                } else if(
                    response.data.error === "duplicateRoutineActivityError" 
                ){
                    setDuplicateRoutineActivity(true);
                } else {
                    getRoutine();
                    setDuration("");
                    setCount("");
                }
            }catch(error) {
                console.error(error)
            }
        }
    };
    const deleteActivity = async (routineActivityId) => {
        try{
            await fetch(`/api/routine_activities/${routineActivityId}`,{
                method: 'DELETE',
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${window.localStorage.getItem("fitness-tracker-token")}`
                },
            });
            getRoutine();
        } catch(error) {
            console.error(error);
        }
    };
    return(
       <>
       {
        (unauthorizedUserError)?
        <p>You may not edit a routine that is not registered to user</p> :
        null
       }
        <form onSubmit = {editRoutineData}>
            {
                (Object.keys(editRoutine).length) ?
                <h5>{editRoutine.name}</h5>:
                null
            }
        <div className="mb-3">
            <label htmlFor="goal" className="form-label">Routine Goal</label>
            <input className="form-control" id="goal" value = {goal} onChange = {(event)=>{
                setGoal(event.target.value)
            }}></input>
        </div>
        <div className="form-check">
            <input className="form-check-input" type="checkbox" checked = {isPublic} id="isPublic" onChange={(event)=>{
                setIsPublic(event.target.value)
            }}></input>
            <label className="form-check-label" htmlFor="isPublic">Public</label>
        </div>
        <button type ="submit" className="btn btn-primary">Edit Routine Details</button>
        </form>
        {
            (Object.keys(editRoutine).length)?
                editRoutine.activities.map((activity, i) => {
                    return(
                        <div className="card routine-activity-card" key={i}>
                        <div className="card-body">
                            <h5 className="card-title">{activity.name}</h5>
                            <p className="card-text">{activity.description}</p>
                            <p className="card-text">Duration: {activity.duration}</p>
                            <p className="card-text"> Count: {activity.count}</p>
                            <button className="btn btn-danger" onClick={()=>{
                                deleteActivity(activity.id);
                            }}>Delete Activity</button>
                        </div>
                    </div>
                    )
                }):
                null
        }
        {
            (duplicateRoutineActivity)?
            <p>Activity Already Exists in Routine</p>:
             null
        }
        <form onSubmit = {addActivity}>
        <select className="form-select" onChange = {(event)=>{
            setSelectedActivityId(event.target.value)
        }}>
            <option value = "0">Select Activity to Add</option>
            {
                activityData.length ?
                activityData.map((activity,i) =>{
                    return (
                        <option value = {activity.id} key={i}>{activity.name}</option>)
                }) :
                null
            }
        </select>
        <div className="mb-3">
            <label htmlFor="duration" className="form-label">Activity Duration</label>
            <input className="form-control" id="goal" value = {duration} onChange = {(event)=>{
                setDuration(event.target.value)
            }}></input>
        </div>
        <div className="mb-3">
            <label htmlFor="count" className="form-label">Activity Count</label>
            <input className="form-control" id="count" value = {count} onChange = {(event)=>{
                setCount(event.target.value)
            }}></input>
        </div>
        <button type = "submit" className="btn btn-primary">Add Activity</button>
        </form>
       </>
    )
}
export default EditRoutine;