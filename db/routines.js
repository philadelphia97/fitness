const { promise } = require('bcrypt/promises');
const client = require('./client');
//double check
async function getRoutineById(id){
  try {
    const { rows: [ routines ] } = await client.query(`
      SELECT id, "creatorId", "isPublic", name, goal
      FROM routines
      WHERE id=${ id };
    `);

    if (!routines) {
      throw {
        name: "UserNotFoundError",
        message: "A user with that id does not exist"
      }
    }

    routines.posts = await getRoutinesWithoutActivities(id);

    return routines;
  } catch (error) {
    console.error(error)
    throw error;
  }
}
//this is probably good but double check
async function getRoutinesWithoutActivities(){
  try {
    const {rows} = await client.query(
      `
      SELECT id, "creatorId", "isPublic", name, goal
      from routines;
      `
    );
    return rows;
  } catch (error) {
    console.error(error)
    throw error;
  }
}
//think it's good but doble check
async function getAllRoutines(attachActivitiesToRoutines) {
  try {
    const {rows} = await client.query(`
    SELECT *
    FROM routines
    JOIN users ON routines."creatorId" = user.id
    `)
    attachActivitiesToRoutines(rows)
  } catch (error) {
    console.error(error)
  }
}
//double check but needs work
async function getAllRoutinesByUser({username}) {
  try {
    const {rows : routines} = await client.query(`
    SELECT *
    FROM routines
    WHERE "name"=${username}
    `);

  const routinesByUser = await Promise.all(routines.map(
    routines => getRoutineById( routines.id )));

    
    return routinesByUser
  } catch (error) {
    console.error(error)
  }

}
//this needs work
async function getPublicRoutinesByUser({
  username
}) {
try {
  const  {rows : [routines]} = await client.query(`
  SELECT id, "creatorId", "isPublic", name, goal
  WHERE user=${username}
  RETURNING*;
  `)

  return routines;
  
} catch (error) {
  console.error(error)
  throw error
}
}
//this is probably good but double check
async function getAllPublicRoutines() {
  try {
    const {rows} = await client.query(`
    SELECT id, "creatorId", "isPublic", name, goal
    FROM routines
    `)

    return rows;
  } catch (error) {
    console.error(error)
    throw error
  }

}

//this needs work
async function getPublicRoutinesByActivity({id}) {
  try {
    const  {rows : [routines]} = await client.query(`
  SELECT id, "creatorId", "isPublic", name, goal
  WHERE id=${id}
  RETURNING*;
  `)

  return routines;
    
  } catch (error) {
    console.error(error)
    throw error;
  }
}

async function createRoutine({creatorId, isPublic, name, goal}) {
  try {
  const { rows: [routine]} = await client.query(`
  INSERT INTO routines("creatorId", "isPublic", name, goal)
  VALUES($1, $2, $3, $4)
  RETURNING *;
  `, [creatorId, isPublic, name, goal]);
  return routine;
  } catch (error) {
    console.error(error)
    throw error;
  }
}

async function updateRoutine({id, ...fields}) {
  const setString = Object.keys(fields).map(
    (key,index) => `"${ key }"=${ index+1 }`
  ).join(', ')

  if (setString.length === 0) {
    return;
  }

  try {
    const {rows : [routines]} = await client.query(`
    UPDATE routines
    SET ${setString}
    WHERE id=${ id }
    RETURNING*;
    `, Object.values(fields))

    return routines;
  } catch (error) {
    console.error(error)
    throw error;
  }
}

async function destroyRoutine(id) {
  const {rows: [routines]} = await client.query(`
  DELETE
  FROM routines
  WHERE id = ${id}
  
  `)
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