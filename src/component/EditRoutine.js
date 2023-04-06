import Axios from "axios";
import React, { useState, useEffect } from "react";
import {useParams} from 'react-router-dom';

const EditRoutine = () =>{
    const [editRoutine, setEditRoutine] = useState({});
    const { routineId } = useParams();
    const [ name, setName ] = useState("");
    const [ goal, setGoal ] = useState("");
    const [ isPublic, setIsPublic ] = useState(false);
    const [ selectedActivityId, setSelectedActivityId ] = useState(0);
    const [ duration, setDuration ] = useState("");
    const [ count, setCount ] = useState("");

    const getRoutine = async() => {
        try{
            const response = await Axios.get(`/api/routines/${routineId}`)
            setEditRoutine(response.data);
        } catch(error) {
            console.error(error);
        }
    }
    useEffect(() => {
        getRoutine();
    },[])

    useEffect(() => {
        if(editRoutine && Object.keys(editRoutine).length){
            setName(editRoutine.name);
            setGoal(editRoutine.goal);
            setIsPublic(editRoutine.isPublic);
        }
    })
    const editRoutineData = (event) =>{
        event.preventDefault();
    };
    const addActivity = (event) => {
        event.preventDefault();
    }
    return(
       <>
        <form onSubmit = {editRoutineData}>
            <div className="mb-3">
                <label htmlFor="name" className="form-label">Routine Name</label>
                <input className="form-control" id="name" value = {name} onChange = {(event)=>{
                    setName(event.target.value)
                }}></input>
            </div>
            <div className="mb-3">
            <label htmlFor="goal" className="form-label">Routine Goal</label>
            <input className="form-control" id="goal" value = {goal} onChange = {(event)=>{
                setGoal(event.target.value)
            }}></input>
        </div>
        <div className="form-check">
            <input className="form-check-input" type="checkbox" value = {isPublic} id="isPublic" onClick={(event)=>{
                setIsPublic(event.target.value)
            }}></input>
            <label className="form-check-label" htmlFor="isPublic">Public</label>
        </div>
        <button type ="submit" className="btn btn-primary">Edit Routine Details</button>
        </form>
        <form onSubmit = {addActivity}>
        </form>
       </>
    )
}

export default EditRoutine;