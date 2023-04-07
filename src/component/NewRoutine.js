import Axios from "axios";
import React, { useState } from "react";
import { Navigate, useNavigate } from 'react-router-dom'

const NewRoutine = () =>{
    const [ name, setName ] = useState("");
    const [ goal, setGoal ] = useState("");
    const [ isPublic, setIsPublic ] = useState(false);
    const navigate = useNavigate();

    const createRoutine = async () => {
        if(name && goal){
            try{
                const routine = await Axios.post("/api/routines", {
                    name, goal, isPublic},
                {
                    headers: {
                        'Content-Type' : 'application/json',
                        'Authorization': `Bearer ${window.localStorage.getItem("fitness-tracker-token")}`
                    }
                })
                setName("")
                setGoal("")
                setIsPublic(false)
                navigate(`/edit/${routine.data.id}`)
            } catch(error) {
                console.error(error)
            }
        }
    }
    return(
       <>
            <form onSubmit = {createRoutine} >
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Routine Name</label>
                    <input className="form-control" id="name" value={name} onChange={(event) =>{
                        setName(event.target.value)
                    }}></input>
                </div>
                <div className="mb-3">
                    <label htmlFor="goal" className="form-label">Routine Goal</label>
                    <input className="form-control" id="goal" value={goal} onChange={(event) =>{
                        setGoal(event.target.value)
                    }}></input>
                </div>
                <div className="form-check">
                    <label className="form-check-label" htmlFor="isPublic">Make Public?</label>
                    <input className="form-check-input" type="checkbox" checked={isPublic} id="isPublic" onChange={(event) =>{
                        setIsPublic(event.target.checked)
                    }}></input>
                </div>
                <button type="submit" className="btn btn-primary">Submit Routine</button>
            </form>

       </>
    )
}

export default NewRoutine;