
const client = require("./client");
// const { user } = require("pg/lib/defaults");
const bcrypt = require("bcrypt");
const SALT_COUNT = 8;

// database functions

// user functions
async function createUser({ username, password }) {
  const hashedPassword = await bcrypt.hash(password, SALT_COUNT);
  try {
    const {
      rows: [user],
    } = await client.query(
      `
      INSERT INTO users(username, password)
      VALUES ($1, $2)
      ON CONFLICT (username) DO NOTHING
      RETURNING id, username;
    `,
      [username, hashedPassword]
    );
    return user;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
async function getUser({ username, password }) {
  if (!username || !password) {
    return;
  }

  try {
    const user = await getUserByUsername(username);
    if(!user) return;
    const hashedPassword = user.password;
    const passwordsMatch = await bcrypt.compare(password, hashedPassword);
    if(!passwordsMatch) return;
    delete user.password;
    return user;
  } catch (error) {
    console.error(error)
    throw error;
  }

}

async function getUserById(userId) {
  try {
    const {
      rows: [user],
    } = await client.query(`
      SELECT id, username, password
      FROM users
      WHERE id=${userId}
    `);

    if (!user) {
      return null;
    }
    delete user.password;
    return user;
  } catch (error) {
    console.error(error)
    throw error;
  }
}

async function getUserByUsername(userName) {
    try {
      const {
        rows: [user],
      } = await client.query(
        `
        SELECT *
        FROM users
        WHERE username=$1;
      `,
        [userName]
      );
  
      return user;
    } catch (error) {
      console.error(error)
      throw error;
    }
  }


module.exports = {
  createUser,
  getUser,
  getUserById,
  getUserByUsername,
};
