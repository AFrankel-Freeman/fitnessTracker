const client = require("./client");
const bcrypt = require('bcrypt');

// database functions

// user functions
const createUser = async ({ username, password }) => {
  try {
    password = await bcrypt.hash(password, 10);
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
    const { rows:[ user ]} = await client.query(`
      SELECT *
      FROM users
      WHERE username = '${username}'
    `)
    if(user && await bcrypt.compare(password, user.password)){
      delete user.password
      return user;
    }
    return null;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getUserById = async (userId) => {
  try {
    const { rows: [user] } = await client.query(`
      SELECT id, username
      FROM users
      WHERE id=${userId};
    `)
    if (!user) {
      return null;
    }
    
    return user;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getUserByUsername = async (username) => {
  try {
    const { rows:[user] } = await client.query(`
      SELECT *
      FROM users
      WHERE username = '${username}'
    `)

    return user;
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
