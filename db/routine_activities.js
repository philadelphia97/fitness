const client = require('./client')

<<<<<<< HEAD
async function getRoutineActivityById(id){
  
=======
async function getRoutineActivityById(id) {
  try {
    const {
      rows: [routine_activities],
    } = await client.query(
      `
      SELECT *
      FROM routine_activities
      WHERE id=$1;
    `,
      [id]
    );
    console.log('routine_activities', routine_activities)
    return routine_activities;
  } catch (error) {
    console.error(error);
  }
>>>>>>> 5cf364e8fc625af81ce2efc5b93b7239e8a0b39a
}

async function addActivityToRoutine({
  routineId,
  activityId,
  count,
  duration,
}) {
<<<<<<< HEAD
    try {
      const {rows: [addedActivityRoutine]} = await client.query(`
      INSERT INTO routine_activities ("routineId", "activityId", count, duration)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
      `, [routineId, activityId, count, duration]);
      return addedActivityRoutine;
    } catch (error) {
      console.error(error);
    }
=======
  try {
    const { rows: [routine_activities] } = await client.query(
      `
     INSERT INTO routine_activities("routineId", "activityId", "count", "duration")
     VALUES ($1, $2, $3, $4)
     RETURNING *;
     `,
      [routineId, activityId, count, duration]
    );
    return routine_activities;
  } catch (error) {
    console.error(error);
  }
>>>>>>> 5cf364e8fc625af81ce2efc5b93b7239e8a0b39a
}

async function getRoutineActivitiesByRoutine({id}) {
}

async function updateRoutineActivity ({id, ...fields}) {
}

async function destroyRoutineActivity(id) {
}

async function canEditRoutineActivity(routineActivityId, userId) {
}

module.exports = {
  getRoutineActivityById,
  addActivityToRoutine,
  getRoutineActivitiesByRoutine,
  updateRoutineActivity,
  destroyRoutineActivity,
  canEditRoutineActivity,
};
