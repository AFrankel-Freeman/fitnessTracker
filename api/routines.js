const express = require('express');
const {
    getAllPublicRoutines,
    createRoutine,
    updateRoutine,
    getRoutineById,
    destroyRoutineActivity,
    destroyRoutine,
    getRoutineActivitiesByRoutine,
    addActivityToRoutine } = require('../db');
const requireUser = require('./utils');
const router = express.Router();

// GET /api/routines
router.get('/', async (req, res) => {
    try {
        const routines = await getAllPublicRoutines();
        res.send(routines);
    } catch (error) {
        console.error(error);
    }
});

// POST /api/routines
router.post('/', requireUser, async (req, res) => {
    const { isPublic, name, goal } = req.body;
    const creatorId = req.user.id;
    try {
        const newRoutine = await createRoutine({
            creatorId, isPublic, name, goal
        });
        res.send(newRoutine);
    } catch (error) {
        console.error(error);
    }
});

// GET /api/routines/:routineId
router.get('/:routineId', async (req, res) => {
    const routineId = req.params.routineId;
    try {
        const routine = await getRoutineById(routineId);
        res.send(routine);
    } catch (error) {
        console.error(error);
    }
})

// PATCH /api/routines/:routineId
router.patch('/:routineId', requireUser, async (req, res) => {
    const routineId = req.params.routineId;
    try {
        const routine = await getRoutineById(routineId);
        if (routine.creatorId !== req.user.id) {
            res.status(403);
            res.send({ name: `Unauthorized Update Error`, message: `User ${req.user.username} is not allowed to update ${routine.name}`, error: `unauthorizedUpdateError` })
        } else {
            const updatedRoutine = await updateRoutine({ id: routineId, ...req.body });
            res.send(updatedRoutine);
        }
    } catch (error) {
        console.error(error);
    }
})

// DELETE /api/routines/:routineId
router.delete('/:routineId', requireUser, async (req, res) => {
    const routineId = req.params.routineId;
    try {
        const routine = await getRoutineById(routineId);
        if (routine.creatorId !== req.user.id) {
            res.status(403);
            res.send({ name: `Unauthorized Delete Error`, message: `User ${req.user.username} is not allowed to delete ${routine.name}`, error: `unauthorizedDeleteError` })
        } else {
            const routineActivities = await getRoutineActivitiesByRoutine(routine);
            for (let i = 0; i < routineActivities.length; i++) {
                await destroyRoutineActivity(routineActivities[i].id)
            }
            const deletedRoutine = await destroyRoutine(routineId);
            res.send(deletedRoutine);
        }
    } catch (error) {
        console.error(error);
    }
});

// POST /api/routines/:routineId/activities
router.post('/:routineId/activities', requireUser, async (req, res) => {
    const { activityId, count, duration } = req.body;
    const routineId = req.params.routineId;
    try {
        const routine = await getRoutineById(routineId);
        if (routine.creatorId !== req.user.id) {
            res.send({ name: `Unauthorized Update Error`, message: `User ${req.user.username} is not allowed to update ${routine.name}`, error: `unauthorizedUpdateError` })
        } else {
            const routineActivity = await addActivityToRoutine({
                routineId, activityId, count, duration
            });
            if (!routineActivity) {
                res.send({ name: 'Duplicate Routine Activity Error', message: `Activity ID ${activityId} already exists in Routine ID ${routineId}`, error: 'duplicateRoutineActivityError'})
            } else {
                res.send(routineActivity);
            }
        }
    } catch (error) {
        console.error(error)
    }
});

module.exports = router;
