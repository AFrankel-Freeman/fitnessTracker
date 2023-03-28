const express = require('express');
const { getPublicRoutinesByActivity } = require('../db');
const router = express.Router();
const { getAllActivities, getActivityByName, createActivity, getActivityById, updateActivity } = require('../db/activities');

// GET /api/activities/:activityId/routines
router.get('/:activityId/routines', async (req, res) => {
    try{
        const activityId = req.params.activityId;
        const activity = await getActivityById(activityId);
        if(!activity){
            res.send({name:`Activity Not Found Error`, message: `Activity ${activityId} not found`, error:`activityNotFoundError`})
        } else {
            const routines = await getPublicRoutinesByActivity(activityId);
            res.send(routines)}
    } catch (error){
        console.log(error)
    }
});

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
            res.send({name: `activity exists error`, message:`An activity with name ${name} already exists`, error:`activityExistsError`});
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
router.patch ('/:activityId', async (req,res) => {
    const activityId = req.params.activityId;
    try{
        const activity = await getActivityById(activityId);
        if(!activity){
            res.send({name:`Activity Not Found Error`, message: `Activity ${activityId} not found`, error:`activityNotFoundError`})
        } else if (req.body.name){
            const doesActivityExist = await getActivityByName(req.body.name);
            if(doesActivityExist){
                res.send({name: `activity exists error`, message:`An activity with name ${req.body.name} already exists`, error:`activityExistsError`});
            }
        } const updatedActivity = await updateActivity(activityId, req.body)
        
        res.send(updatedActivity)
    } catch(error){
        console.log(error)
    }
})
module.exports = router;
