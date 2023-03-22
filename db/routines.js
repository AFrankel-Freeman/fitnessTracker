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

  } catch (error) {
    console.error(error);
    throw error
  }
};

const getAllPublicRoutines = async () => {
  try {

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
