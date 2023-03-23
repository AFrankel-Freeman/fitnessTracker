const client = require("./client");
const { getRoutineActivitiesByRoutine } = require("./routine_activities");
const { getUserById } = require("./users");

const createRoutine = async ({ creatorId, isPublic, name, goal }) => {
  try {
    const { rows: [routine] } = await client.query(`
      INSERT INTO routines("creatorId", "isPublic", name, goal)
      VALUES($1, $2, $3, $4)
      RETURNING *;
    `, [creatorId, isPublic, name, goal]);
    return routine;
  } catch (error) {
    console.error(error);
    throw error
  }
};

const getRoutineById = async (id) => {
  try {
    const { rows: [routine] } = await client.query(`
      SELECT *
      FROM routines
      WHERE id = ${id}
    `);
    return routine;
  } catch (error) {
    console.error(error);
    throw error
  }
};

const getRoutinesWithoutActivities = async () => {
  try {
    const { rows } = await client.query(`
      SELECT *
      FROM routines
      LEFT JOIN routine_activities
      ON routines.id = routine_activities."routineId"
      WHERE routine_activities."routineId" IS NULL;
    `);
    return rows;
  } catch (error) {
    console.error(error);
    throw error
  }
};

const getAllRoutines = async () => {
  try {
    const { rows: routines } = await client.query(`
      SELECT routines.*, users.username AS "creatorName"
      FROM routines
      JOIN users
        ON routines."creatorId"=users.id;
    `)

    for (let i = 0; i < routines.length; i++) {
      const { rows: activities } = await client.query(`
        SELECT activities.*, routine_activities.duration, routine_activities.count, routine_activities.id AS "routineActivityId", routine_activities."routineId"
        FROM routine_activities
        JOIN activities
          ON routine_activities."activityId"=activities.id
        WHERE routine_activities."routineId"=${routines[i].id}
      `)
      routines[i].activities = activities;
    };
    return routines;
  } catch (error) {
    console.error(error);
    throw error
  }
};

const getAllPublicRoutines = async () => {
  try {
    const allRoutines = await getAllRoutines();
    const publicRoutines = allRoutines.filter(routine => routine.isPublic);
    return publicRoutines;
  } catch (error) {
    console.error(error);
    throw error
  }
};

const getAllRoutinesByUser = async ({ username }) => {
  try {

  } catch (error) {
    console.error(error);
    throw error
  }
};

// const getPublicRoutinesByUser = async ({ username }) => {

// };

// const getPublicRoutinesByActivity = async ({ id }) => {

// };

const updateRoutine = async ({ id, ...fields }) => {
  try {

  } catch (error) {
    console.error(error);
    throw error
  }
};

const destroyRoutine = async (id) => {
  try {

  } catch (error) {
    console.error(error);
    throw error
  }
};

module.exports = {
  getRoutineById,
  getRoutinesWithoutActivities,
  getAllRoutines,
  getAllPublicRoutines,
  getAllRoutinesByUser,
  // getPublicRoutinesByUser,
  // getPublicRoutinesByActivity,
  createRoutine,
  updateRoutine,
  destroyRoutine,
};
