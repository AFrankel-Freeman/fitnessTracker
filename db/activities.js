const client = require('./client');

// database functions
const createActivity = async ({ name, description }) => {
  // return the new activity
  try {
    const { rows: [activity] } = await client.query(`
      INSERT INTO activities(name, description)
      VALUES($1, $2)
      ON CONFLICT (name) DO NOTHING
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
    const { rows:[ activity ] } = await client.query(`
      SELECT *
      FROM activities
      WHERE id = ${id}
    `);
    return activity;
  } catch (error) {
    console.error(error);
    throw error
  }
};

const getActivityByName = async (name) => {
  try {
    const { rows: [ activity ] } = await client.query (`
      SELECT *
      FROM activities
      WHERE name = '${name}'
    `);
    return activity;

  } catch (error) {
    console.error(error);
    throw error
  }
};

// used as a helper inside db/routines.js
const attachActivitiesToRoutines = async (routines) => {
  try {
    for (let i = 0; i < routines.length; i++) {
      const { rows: activities } = await client.query(`
        SELECT activities.*, routine_activities.duration, routine_activities.count, routine_activities.id AS "routineActivityId", routine_activities."routineId"
        FROM routine_activities
        JOIN activities
          ON routine_activities."activityId"=activities.id
        WHERE routine_activities."routineId"=${routines[i].id}
      `)
      routines[i].activities = activities;
    }

  } catch (error) {
    console.error(error);
    throw error
  }
};

const updateActivity = async ({ id, ...fields }) => {
  // don't try to update the id
  // do update the name and description
  // return the updated activity
  const setString = Object.keys (fields).map(
    (key, index) => `"${key}" = $${index+1}`
  ).join(', ');
    if(!setString.length){ 
    return 
  }
  try {
    const { rows: [ activity ] } = await client.query(`
      UPDATE activities
      SET ${setString}
      WHERE id = ${id}
      RETURNING *;
    `, Object.values(fields));
    
    return activity;
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
