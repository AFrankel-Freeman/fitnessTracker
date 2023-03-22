const client = require('./client');

// database functions
const createActivity = async ({ name, description }) => {
  // return the new activity
  try {
    const { rows: [activity] } = await client.query(`
      INSERT INTO activities(name, description)
      VALUES($1, $2)
      RETURNING *;
    `, [name, description]);
    return activity;
  } catch (error) {
    console.error(error);
    throw error
  }
};

const getAllActivities = async () => {
  // select and return an array of all activities
  try {
    const { rows } = await client.query(`
      SELECT *
      FROM activities
    `);
    return rows;
  } catch (error) {
    console.error(error);
    throw error
  }
};

const getActivityById = async (id) => {
  try {

  } catch (error) {
    console.error(error);
    throw error
  }
};

const getActivityByName = async (name) => {
  try {

  } catch (error) {
    console.error(error);
    throw error
  }
};

// used as a helper inside db/routines.js
const attachActivitiesToRoutines = async (routines) => {
  try {

  } catch (error) {
    console.error(error);
    throw error
  }
};

const updateActivity = async ({ id, ...fields }) => {
  // don't try to update the id
  // do update the name and description
  // return the updated activity
  try {

  } catch (error) {
    console.error(error);
    throw error
  }
}

module.exports = {
  getAllActivities,
  getActivityById,
  getActivityByName,
  attachActivitiesToRoutines,
  createActivity,
  updateActivity,
};
