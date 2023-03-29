const express = require('express');
const { getRoutineActivityById, getRoutineById, updateRoutineActivity, destroyRoutineActivity } = require('../db');
const router = express.Router();
const requireUser = require(`./utils`);

// PATCH /api/routine_activities/:routineActivityId
router.patch(`/:routineActivityId`, requireUser, async (req, res) => {
    const routineActivityId = req.params.routineActivityId;
    try {
        const routineActivity = await getRoutineActivityById(routineActivityId);
        const routine = await getRoutineById(routineActivity.routineId);
        if (routine.creatorId !== req.user.id) {
            res.send({ name: `Unauthorized Update Error`, message: `User ${req.user.username} is not allowed to update ${routine.name}`, error: `unauthorizedUpdateError` })
        } else {
            const updatedRoutineActivity = await updateRoutineActivity({ id: routineActivityId, ...req.body })
            res.send(updatedRoutineActivity);
        }
    } catch (error) {
        console.log(error);
    }
});

// DELETE /api/routine_activities/:routineActivityId
router.delete(`/:routineActivityId`, requireUser, async (req, res) => {
    const routineActivityId = req.params.routineActivityId;
    try {
        const routineActivity = await getRoutineActivityById(routineActivityId);
        const routine = await getRoutineById(routineActivity.routineId);
        if (routine.creatorId !== req.user.id) {
            res.status(403);
            res.send({ name: `Unauthorized Delete Error`, message: `User ${req.user.username} is not allowed to delete ${routine.name}`, error: `unauthorizedDeleteError` })
        } else {
            const deletedRoutineActivity = await destroyRoutineActivity(routineActivityId);
            res.send(deletedRoutineActivity);
        }
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;
