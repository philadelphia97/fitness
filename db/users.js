const { user } = require("pg/lib/defaults");
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

// async function getUser({ username, password }) {}

async function getUserById(userId) {}

// async function getUserByUsername(userName) {}

module.exports = {
  createUser,
  // getUser,
  // getUserById,
  // getUserByUsername,
};
