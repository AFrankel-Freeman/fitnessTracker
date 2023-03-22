const client = require("./client");

const addActivityToRoutine = async ({
  routineId,
  activityId,
  count,
  duration,
}) => {
  try {
    const { rows: [routineActivity] } = await client.query(`
      INSERT INTO routine_activities("routineId", "activityId", count, duration)
      VALUES($1, $2, $3, $4)
      RETURNING *;
    `, [routineId, activityId, count, duration]);
    return routineActivity;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getRoutineActivityById = async (id) => {
  try {

  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getRoutineActivitiesByRoutine = async ({ id }) => {
  try {

  } catch (error) {
    console.error(error);
    throw error;
  }
};

const updateRoutineActivity = async ({ id, ...fields }) => {
  try {

  } catch (error) {
    console.error(error);
    throw error;
  }
};

const destroyRoutineActivity = async (id) => {
  try {

  } catch (error) {
    console.error(error);
    throw error;
  }
};

const canEditRoutineActivity = async (routineActivityId, userId) => {
  try {

  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports = {
  getRoutineActivityById,
  addActivityToRoutine,
  getRoutineActivitiesByRoutine,
  updateRoutineActivity,
  destroyRoutineActivity,
  canEditRoutineActivity,
};
