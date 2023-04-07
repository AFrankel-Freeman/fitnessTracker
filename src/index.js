import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter, Routes, Route } from "react-router-dom";
import Axios from "axios";
import AllActivities from "./component/AllActivities.js";
import AllRoutines from "./component/AllRoutines.js";
import EditRoutine from "./component/EditRoutine.js";
import Header from "./component/Header.js";
import Home from "./component/Home.js";
import Login from "./component/Login.js";
import NewActivity from "./component/NewActivity.js";
import NewRoutine from "./component/NewRoutine.js";
import Profile from "./component/Profile.js";
import Register from "./component/Register.js";

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(window.localStorage.getItem('fitness-tracker-token'));
    const [activityData, setActivityData] = useState([]);

    const getAllActivities = async () => {
        try {
            const response = await Axios.get("/api/activities")
            setActivityData(response.data);
        } catch (error) {
            console.error(error)
        };
    };
    useEffect(() => {
        getAllActivities();
    }, []);

    return (
        <>
            <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
            <main>
                <Routes>
                    <Route path="/" element={<Home />}></Route>
                    <Route path="/login" element={
                        <Login
                            setIsLoggedIn={setIsLoggedIn}
                        />}></Route>
                    <Route path="/register" element={
                        <Register
                            setIsLoggedIn={setIsLoggedIn}
                        />}></Route>
                    <Route path="/routines" element={<AllRoutines />}></Route>
                    <Route path="/activities" element={
                        <AllActivities
                            activityData={activityData}
                        />}></Route>
                    <Route path="/profile" element={<Profile />}></Route>
                    <Route path="/newroutine" element={<NewRoutine />}></Route>
                    <Route path="/newactivity" element={
                        <NewActivity
                            getAllActivities={getAllActivities} />}></Route>
                    <Route path="/edit/:routineId" element={<EditRoutine activityData={activityData} />}></Route>
                </Routes>
            </main>
        </>
    )
};



const Container = document.getElementById("root");

const root = createRoot(Container);
root.render(
    <HashRouter>
        <App />
    </HashRouter>
)