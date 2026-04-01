const pool = require("../config/db");

const createUser = async ({ name, email, password, gender }) => {
  try {
    const result = await pool.query(
      `INSERT INTO users (name, email, password, gender) VALUES ($1, $2, $3, $4) RETURNING *`,
      [name, email, password, gender],
    );
    return result.rows[0];
  } catch (error) {
    throw error;
  }
};
const getUserByEmail = async ({ email, password }) => {
  try {
    const result = await pool.query(
      `SELECT email,password from users WHERE email=$1`,
      [email],
    );
    return result.rows[0];
  } catch (error) {
    console.log(error);
  }
};
module.exports = { createUser, getUserByEmail };
