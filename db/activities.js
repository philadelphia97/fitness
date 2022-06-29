const client = require("./client");
const util = require("./utils");

// database functions
async function getAllActivities() {
  try {
    const { rows } = await client.query(
      `
      SELECT *
      FROM activities;
    `
    );
    return rows;
  } catch (error) {
    console.error(error);
  }
}

async function getActivityById(id) {
  try {
    const {
      rows: [activity],
    } = await client.query(
      `
      SELECT *
      FROM activities
      WHERE id=$1;
    `,
      [id]
    );
    return activity;
  } catch (error) {
    console.error(error);
  }
}

async function getActivityByName(name) {
  try {
    const {
      rows: [activity],
    } = await client.query(
      `
      SELECT *
      FROM activities
      WHERE name=$1;
    `,
      [name]
    );
    return activity;
  } catch (error) {
    console.error(error);
  }
}

async function attachActivitiesToRoutines(routines) {
  //take in list of routines
  
  // limit our activities query below to just these routines

  //get activitys for these routines

  /**
   * activity {id: 1, name: pushups } ---> routineActivities{routineId, activityId}

   New Copy ==> [{id, name, number, routineId}]

  */

   //iterate through routines / For each -> figure out which activites match routineID to routine.id
   //add those activites to the current routine
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
