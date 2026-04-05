const pool = require("../config/db");

const createFriend = async (userId, friendId) => {
  try {
    const result = await pool.query(
      `
      INSERT INTO friends (user_id,friend_id) VALUES ($1, $2) RETURNING *
      `,
      [userId, friendId],
    );
    return result.rows[0];
  } catch (error) {
    throw error;
  }
};

module.exports = { createFriend };
