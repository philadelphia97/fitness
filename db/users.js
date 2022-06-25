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
  try {
    getUserByUsername()
    const hashedPassword = await bcrypt.hash(password, SALT_COUNT)
    const match = await bcrypt.compare(password, hashedPassword)
    if(match) {
      return username
    }
    if (!match) {
      return null
    }

  } catch (error) {
    console.error(error)
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
