const client = require("./client");

const createRoutine = async ({ creatorId, isPublic, name, goal }) => {

};

const getRoutineById = async (id) => {

};

// const getRoutinesWithoutActivities = async () => {

// };

const getAllRoutines = async () => {

};

const getAllPublicRoutines = async () => {

};

const getAllRoutinesByUser = async ({ username }) => {

};

// const getPublicRoutinesByUser = async ({ username }) => {

// };

// const getPublicRoutinesByActivity = async ({ id }) => {

// };

const updateRoutine = async ({ id, ...fields }) => {

};

const destroyRoutine = async (id) => {

};

module.exports = {
  getRoutineById,
  // getRoutinesWithoutActivities,
  getAllRoutines,
  getAllPublicRoutines,
  getAllRoutinesByUser,
  // getPublicRoutinesByUser,
  // getPublicRoutinesByActivity,
  createRoutine,
  updateRoutine,
  destroyRoutine,
};
