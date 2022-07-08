const client = require("./client");
const util = require("./utils");


async function getAllActivities() {
  try {
    //destructure rows
    const { rows } = await client.query(
      //select everything from activites
      `
      SELECT *
      FROM activities;
    `
    );
    //return those rows
    return rows;
  } catch (error) {
    console.error(error);
  }
}
//pass in id
async function getActivityById(id) {
  try {
    const {
      //destructure rows and access activity column
      rows: [activity],
    } = await client.query(

      `
      SELECT *
      FROM activities
      WHERE id=$1;
    `,
      [id]
    );
    //return that activity
    return activity;
  } catch (error) {
    console.error(error);
  }
}
//pass in name
async function getActivityByName(name) {
  try {
    const {
      //destructure the rows and access activity column
      rows: [activity],
    } = await client.query(
      `
      SELECT *
      FROM activities
      WHERE name=$1;
    `,
      [name]
    );
    //return those activites
    return activity;
  } catch (error) {
    console.error(error);
  }
}
//pass in routines
async function attachActivitiesToRoutines(routines) {
  try {
    //destructure the rows
    const { rows } = await client.query(
      `SELECT activities.*, routine_activities.id AS "routineActivityId", routine_activities.count, routine_activities.duration, routine_activities."routineId", routine_activities."activityId"
      FROM activities 
      JOIN routine_activities ON routine_activities."activityId" = activities.id;
    `);
    //variable allRoutines empty array
    let allRoutines = [];
    //loop thru
    for (let i = 0; i < routines.length; i++) {
      let currentRoutine = routines[i];
      currentRoutine.activities = rows.filter(
        (act) => act.routineId === currentRoutine.id
      );
      allRoutines.push(currentRoutine);
    }
    return allRoutines;
  } catch (error) {
    console.error(error);
  }
}

// select and return an array of all activities
async function createActivity({ name, description }) {
  try {
    const {
      rows: [activity],
    } = await client.query(
      `
      INSERT INTO activities(name, description)
      VALUES ($1, $2)
      RETURNING *;
    `,
      [name, description]
    );
    return activity;
  } catch (error) {
    console.error(error);
  }
}

// return the new activity
async function updateActivity({ id, ...fields }) {
  try {
    const toUpdate = {};
    for (let column in fields) {
      if (fields[column] !== undefined) toUpdate[column] = fields[column];
    }
    let activity;
    if (util.dbFields(toUpdate).insert.length > 0) {
      const { rows } = await client.query(
        `
        UPDATE activities
        SET ${util.dbFields(toUpdate).insert}
        WHERE id=${id}
        RETURNING *;
      `,
        Object.values(toUpdate)
      );
      activity = rows[0];
    }
    return activity;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// don't try to update the id
// do update the name and description
// return the updated activity
module.exports = {
  getAllActivities,
  getActivityById,
  getActivityByName,
  attachActivitiesToRoutines,
  createActivity,
  updateActivity,
};
