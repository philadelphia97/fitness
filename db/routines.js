const client = require("./client");

// async function getRoutineById(id) {}

async function getRoutinesWithoutActivities() {
  try { 
    const  routines  = await client.query(`
      SELECT *
      FROM routines;    
    `)
    return routines.rows;
  } catch (error) {
    console.error(error)
  }
}

// async function getAllRoutines() {}
  //needs info from users/activities tables through JOIN

// async function getAllRoutinesByUser({ username }) {}

// async function getPublicRoutinesByUser({ username }) {}

// async function getAllPublicRoutines() {}

// async function getPublicRoutinesByActivity({ id }) {}

async function createRoutine({ creatorId, isPublic, name, goal }) {
  try {
    const {
      rows: [routine],
    } = await client.query(`
      INSERT INTO routines("creatorId", "isPublic", "name", "goal")
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `, [creatorId, isPublic, name, goal] 
    );
    return routine;
  } catch (error) {
    console.error(error);
  }
}

// async function updateRoutine({ id, ...fields }) {}

// async function destroyRoutine(id) {}

module.exports = {
  // getRoutineById,
  getRoutinesWithoutActivities,
  // getAllRoutines,
  // getAllPublicRoutines,
  // getAllRoutinesByUser,
  // getPublicRoutinesByUser,
  // getPublicRoutinesByActivity,
  createRoutine,
  // updateRoutine,
  // destroyRoutine,
};
