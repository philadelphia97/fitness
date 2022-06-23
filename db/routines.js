const client = require('./client');

async function getRoutineById(id){
}

async function getRoutinesWithoutActivities(){
  try {
    const {rows} = await client.query(
      `
      SELECT(id,"creatorId","isPublic",name,goal)
      from routines;
      `
    );
    return rows;
  } catch (error) {
    throw error;
  }
}

async function getAllRoutines() {
}

async function getAllRoutinesByUser({username}) {
}

async function getPublicRoutinesByUser({username}) {
}

async function getAllPublicRoutines() {
}

async function getPublicRoutinesByActivity({id}) {
}

async function createRoutine({creatorId, isPublic, name, goal}) {
  const { rows: [routines]} = await client.query(`
  INSERT INTO routines(creatorId, isPublic, name, goal)
  VALUES($1,$2,$3,$4)
  ON CONFLICT (creatorId) DO NOTHING
  RETURNING *
  `, [creatorId, isPublic, name, goal])
}

async function updateRoutine({id, ...fields}) {
}

async function destroyRoutine(id) {
}

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
}