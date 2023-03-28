const express = require('express');
const { getRoutineActivityById, getRoutineById, updateRoutineActivity } = require('../db');
const router = express.Router();
const requireUser = require(`./utils`);

// PATCH /api/routine_activities/:routineActivityId
router.patch (`/:routineActivityId`, requireUser, async (req, res) => {
    const routineActivityId = req.params.routineActivityId;
    try{
        const routineActivity = await getRoutineActivityById(routineActivityId);
        const routine = await getRoutineById(routineActivity.routineId);
    if(routine.creatorId !== req.user.id){
        res.send({name:`unauthorized update Error`, message:`User ${req.user.username} is not allowed to update ${routine.name}`, error:`unauthorizedUpdateError` })
    }
    const updatedRoutineActivity = await updateRoutineActivity({ id:routineActivityId, ...req.body })
    res.send(updatedRoutineActivity);
    } catch (error){
        console.log(error)
    }
}) 

// DELETE /api/routine_activities/:routineActivityId

module.exports = router;
