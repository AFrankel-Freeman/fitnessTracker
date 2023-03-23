const { attachActivitiesToRoutines } = require("./activities");
const client = require("./client");

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
    await attachActivitiesToRoutines(routines);
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
    const allRoutines = await getAllRoutines();
    const routinesByUser = allRoutines.filter(routine => routine.creatorName === username);
    return routinesByUser;

  } catch (error) {
    console.error(error);
    throw error
  }
};

const getPublicRoutinesByUser = async ({ username }) => {
  try{
    const allRoutines = await getAllRoutines();
    const publicRoutinesByUser = allRoutines.filter(routine => routine.creatorName === username && routine.isPublic);
    return publicRoutinesByUser;

  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getPublicRoutinesByActivity = async ({ id }) => {
  try{
    const allRoutines = await getAllRoutines();
    const publicRoutinesByActivity = allRoutines.filter(routine => {
      let containsActivity = false;
      for(let i = 0; i< routine.activities.length; i++){
        if(routine.activities[i].id === id){
          containsActivity= true;
          break;
        }
      }
      return containsActivity && routine.isPublic;
    })
    return publicRoutinesByActivity;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const updateRoutine = async ({ id, ...fields }) => {
      const setString = Object.keys(fields).map(
      (key, index) => `"${key}" = $${index + 1}`
    ).join(', ');
    if (!setString.length) {
      return
    }
    try {
      const { rows: [routine] } = await client.query(`
        UPDATE routines
        SET ${setString}
        WHERE id = ${id}
        RETURNING *;
      `, Object.values(fields))

      return routine;
  } catch (error) {
    console.error(error);
    throw error
  }
};

const destroyRoutine = async (id) => {
  try {
    await client.query(`
      DELETE FROM routine_activities
      WHERE "routineId" = ${id}
    `)
    const { rows: [routine] } = await client.query(`
      DELETE FROM routines
      WHERE id = ${id}
      RETURNING *;
    `)
    return routine;

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
  getPublicRoutinesByUser,
  getPublicRoutinesByActivity,
  createRoutine,
  updateRoutine,
  destroyRoutine,
};
