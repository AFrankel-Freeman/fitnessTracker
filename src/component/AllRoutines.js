import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import SingleRoutine from "./SingleRoutine";

const AllRoutines = () => {
    const [routineData, setRoutineData] = useState([]);

    useEffect(() => {
        const getAllPublicRoutines = async () => {
            try {
                const response = await Axios.get("/api/routines");
                setRoutineData(response.data)
            } catch (error) {
                console.error(error)
            };
        }
        getAllPublicRoutines();
    }, []);

    return (
        <>
            <div className="routines">
                <Link className="btn btn-primary" to="/newroutine">Create New Routine</Link>
                {
                    routineData.map((routine, i) => {
                        return (
                            <SingleRoutine routine={routine} key={i} />
                        )
                    })
                }
            </div>
        </>
    )
}

export default AllRoutines;