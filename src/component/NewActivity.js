import Axios from "axios";
import React, { useState, useEffect } from "react";

// const NewActivity = () =>{
//     const [ name, setName ] = useState("")
//     const [ description, setDescription ] = useState("")

//     const createActivity = async () => {
//         try {
//             const activity = await Axios.post("/api/activities", {
//                 method: "POST",
//                 headers: {
//                     'Content-Type' : 'application/json',
//                     'Authorization': `Bearer ${window.localStorage.getItem("fitness-tracker-token")}`
//                 },
//             })
//             const response = await Axios.get(`/api/activities`)

//         } catch (error) {
//             console.error(error);
//         }
//     }
    return(
        <p>NewActivity</p>
    )
}

export default NewActivity;