import React from "react";
import { createRoot } from "react-dom/client";
import { HashRouter, Routes, Route } from "react-router-dom"; 
import AllActivities from "./component/AllActivities.js";
import AllRoutines from "./component/AllRoutines.js";
import EditRoutine from "./component/EditRoutine.js";
import Header from "./component/Header.js";
import Home from "./component/Home.js";
import Login from "./component/Login.js";
import NewActivity from "./component/NewActivity.js";
import NewRoutine from "./component/NewRoutine.js";
import Profile from "./component/Profile.js";
import Register from "./component/Profile.js";

const App = () => {
    return (
        <> 
            <Header />
                <main>
                    <Routes>
                        <Route path="/" element={<Home />}></Route>
                        <Route path = "/login" element={<Login />}></Route>
                        <Route path = "/register" element={<Register />}></Route>
                        <Route path = "/routines" element={<AllRoutines />}></Route>
                        <Route path = "/activities" element={<AllActivities />}></Route>
                        <Route path = "/profile" element={<Profile />}></Route>
                        <Route path = "/newroutine" element={<NewRoutine />}></Route>
                        <Route path = "/newactivity" element={<NewActivity />}></Route>
                        <Route path = "/edit/:routineId" element={<EditRoutine />}></Route>
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