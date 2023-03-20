const client = require("./client");

const addActivityToRoutine = async ({
  routineId,
  activityId,
  count,
  duration,
}) => {

};

const getRoutineActivityById = async (id) => {

};

const getRoutineActivitiesByRoutine = async ({ id }) => {

};

const updateRoutineActivity = async ({ id, ...fields }) => {

};

const destroyRoutineActivity = async (id) => {

};

const canEditRoutineActivity = async (routineActivityId, userId) => {

};

module.exports = {
  getRoutineActivityById,
  addActivityToRoutine,
  getRoutineActivitiesByRoutine,
  updateRoutineActivity,
  destroyRoutineActivity,
  canEditRoutineActivity,
};
