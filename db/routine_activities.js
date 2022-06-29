const client = require("./client");

async function getRoutineActivityById(id) {}

async function addActivityToRoutine({
  routineId,
  activityId,
  count,
  duration,
}) {
  console.log("mario top")
  try {
    await client.query(
      `
     INSERT INTO routine_activities("routineId", "activityId", "count", "duration")
     VALUES ($1, $2, $3, $4)
     RETURNING *;
     `,
      [routineId, activityId, count, duration]
    );
    console.log("mario")
  } catch (error) {
    console.error(error)
  }
}

async function getRoutineActivitiesByRoutine({ id }) {}

async function updateRoutineActivity({ id, ...fields }) {}

async function destroyRoutineActivity(id) {}

async function canEditRoutineActivity(routineActivityId, userId) {}

module.exports = {
  getRoutineActivityById,
  addActivityToRoutine,
  getRoutineActivitiesByRoutine,
  updateRoutineActivity,
  destroyRoutineActivity,
  canEditRoutineActivity,
};
