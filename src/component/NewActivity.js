import Axios from "axios";
import React, { useState } from "react";

const NewActivity = () =>{
    const [ name, setName ] = useState("")
    const [ description, setDescription ] = useState("")
    const [ activityExists, setActivityExists ] = useState(false);

    const createActivity = async () => {
        if( name && description){
            try {
                const activity = await Axios.post("/api/activities", {name, description}, {
                    headers: {
                        'Content-Type' : 'application/json',
                        'Authorization': `Bearer ${window.localStorage.getItem("fitness-tracker-token")}`
                    },
                })
                if(activity.data.error === "activityExistsError"){
                    setActivityExists(true)
                } else {
                    setName("")
                    setDescription("")
                }

            } catch (error) {
                console.error(error);
            }
        }
    }
    return(
        <>
            {(activityExists) ?
                <p>Activity Already Exists</p> :
                null
            }
            <form onSubmit = {createActivity} >
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Activity Name</label>
                    <input className="form-control" id="name" value={name} onChange={(event) =>{
                        setName(event.target.value)
                    }}></input>
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Activity Description</label>
                    <input className="form-control" id="description" value={description} onChange={(event) =>{
                        setDescription(event.target.value)
                    }}></input>
                </div>
                <button type="submit" className="btn btn-primary">Submit Activity</button>
            </form>
        </>
    )
}

export default NewActivity;