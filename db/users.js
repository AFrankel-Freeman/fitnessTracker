const client = require("./client");

// database functions

// user functions
const createUser = async ({ username, password }) => {
  try {
    const { rows: [user] } = await client.query(`
      INSERT INTO users(username, password)
      VALUES($1, $2)
      ON CONFLICT(username) DO NOTHING
      RETURNING *;
    `, [username, password]);
    delete user.password;
    return user;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getUser = async ({ username, password }) => {
  try {

  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getUserById = async (userId) => {
  try {
    const { rows: [user] } = await client.query(`
      SELECT(id, username)
      FROM users
      WHERE id=${userId};
    `)
    if (!user) {
      return null;
    };
    return user;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getUserByUsername = async (userName) => {
  try {

  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports = {
  createUser,
  getUser,
  getUserById,
  getUserByUsername,
};
