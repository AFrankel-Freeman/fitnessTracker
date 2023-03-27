const express = require('express');
const router = express.Router();
const { getAllActivities, getActivityByName, createActivity } = require('../db/activities');
const { ActivityExistsError } = require('../errors');

// GET /api/activities/:activityId/routines

// GET /api/activities
router.get('/', async (req, res) => {
    try{
        const activities = await getAllActivities();
        res.send(activities);
    } catch (error){
    console.log(error)
    }
});

// POST /api/activities
router.post ('/', async (req, res) => {
    const { name, description } = req.body;
    try{
        const activity = await getActivityByName(name);
        if (activity){
            throw ActivityExistsError(activity.name);
        } else {
            const newActivity = await createActivity({
                name, description
            })
            res.send(newActivity);
        }
    } catch (error){
        console.log(error)
    }
})

// PATCH /api/activities/:activityId

module.exports = router;
