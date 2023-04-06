import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";

const AllActivities = ({activityData}) =>{

    return(
        <>
            <div className="activities">
                <Link className="btn btn-primary" to="/newactivity">Create New Activity</Link>
                {
                    activityData.map((activity,i) => {
                        return(
                            <div className="card activity-card" key={i}>
                                <div className="card-body">
                                    <h5 className="card-title">{activity.name}</h5>
                                    <p className="card-text">{activity.description}</p>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}

export default AllActivities;