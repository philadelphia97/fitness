const client = require("./client")

// database functions
async function getAllActivities() {
try {
  const { rows } = await client.query(`
  SELECT id, name, description
  FROM activities;
  `);

  return rows;
  
} catch (error) {
  console.error(error)
  throw error
}
}

async function getActivityById(id) {
  try {
    const { rows: [ activities ] } = await client.query(`
      SELECT id, name, description
      FROM activities
      WHERE id=${ id }
    `);

    if (!activities) {
      throw {
        name: "UserNotFoundError",
        message: "A user with that id does not exist"
      }
    }

    // user.posts = await getPostsByUser(id);

    return activities;
  } catch (error) {
    console.error(error)
    throw error;
  }
}

async function getActivityByName(name) {
  try {
    const { rows: [ activities ] } = await client.query(`
      SELECT *
      FROM activities
      WHERE name=$1
    `, [ name ]);

    if (!activities) {
      throw {
        name: "UserNotFoundError",
        message: "A user with that username does not exist"
      }
    }

    return activities;
  } catch (error) {
    console.error(error)
    throw error;
  }
}

async function attachActivitiesToRoutines(routines) {
  try {
    const createPostTagPromises = tagList.map(
      tag => createPostTag(postId, tag.id)
    );

    await Promise.all(createPostTagPromises);

    return await getPostById(postId);
  } catch (error) {
    console.error(error)
    throw error;
  }
}

// select and return an array of all activities
async function createActivity({ name, description }) {
const { rows: [activities]} = await client.query(`
INSERT INTO activities(name, description)
VALUES($1,$2)
ON CONFLICT(name) DO NOTHING
RETURNING *
`, [name, description])
return activities;
}

// return the new activity
async function updateActivity({ id, ...fields }) {
// build the set string
const setString = Object.keys(fields).map(
  (key, index) => `"${ key }"=$${ index + 1 }`
).join(', ');

// return early if this is called without fields
if (setString.length === 0) {
  return;
}

try {
  const { rows: [ activities ] } = await client.query(`
    UPDATE activities
    SET ${ setString }
    WHERE id=${ id }
    RETURNING *;
  `, Object.values(fields));

  return activities;
} catch (error) {
  console.error(error)
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
  // attachActivitiesToRoutines,
  createActivity,
  updateActivity,
}
