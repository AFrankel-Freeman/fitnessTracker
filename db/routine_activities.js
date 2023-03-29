const client = require("./client");
const { getRoutineById } = require("./routines")

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
    const { rows: [routineActivity] } = await client.query(`
      SELECT *
      FROM routine_activities
      WHERE id = ${id}
    `);
    return routineActivity;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getRoutineActivitiesByRoutine = async ({ id }) => {
  try {
    const { rows } = await client.query(`
      SELECT *
      FROM routine_activities
      WHERE "routineId" = ${id}
    `);
    return rows;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const updateRoutineActivity = async ({ id, ...fields }) => {
  const setString = Object.keys(fields).map(
    (key, index) => `"${key}" = $${index + 1}`
  ).join(', ');
  if (!setString.length) {
    return
  }
  try {
    const { rows: [routineActivity] } = await client.query(`
      UPDATE routine_activities
      SET ${setString}
      WHERE id = ${id}
      RETURNING *;
    `, Object.values(fields));

    return routineActivity;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const destroyRoutineActivity = async (id) => {
  console.log(id);
  try {
    const { rows: [routineActivity] } = await client.query(`
      DELETE FROM routine_activities
      WHERE id = ${id}
      RETURNING *;
    `)

    return routineActivity;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const canEditRoutineActivity = async (routineActivityId, userId) => {
  try {
    const routineActivity = await getRoutineActivityById(routineActivityId);
    const routine = await getRoutineById(routineActivity.routineId);

    return userId === routine.creatorId;
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
