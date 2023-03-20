const client = require('./client');

// database functions
const createActivity = async ({ name, description }) => {
  // return the new activity
};

const getAllActivities = async () => {
  // select and return an array of all activities
};

const getActivityById = async (id) => {

};

const getActivityByName = async (name) => {

};

// used as a helper inside db/routines.js
const attachActivitiesToRoutines = async (routines) => {

};

const updateActivity = async ({ id, ...fields }) => {
  // don't try to update the id
  // do update the name and description
  // return the updated activity
}

module.exports = {
  getAllActivities,
  getActivityById,
  getActivityByName,
  attachActivitiesToRoutines,
  createActivity,
  updateActivity,
};
