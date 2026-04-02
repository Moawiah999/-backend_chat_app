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
      `SELECT id,name,email,password,gender from users WHERE email=$1`,
      [email],
    );
    return result.rows[0];
  } catch (error) {
    console.log(error);
  }
};
const getAllUsers = async (email) => {
  try {
    const result = await pool.query(
      `SELECT id ,name ,email ,gender FROM public.users WHERE users.email !=$1`,
      [email],
    );
    return result.rows;
  } catch (error) {
    throw error;
  }
};
module.exports = { createUser, getUserByEmail, getAllUsers };
