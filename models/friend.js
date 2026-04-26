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

const getFriendRequests = async (userId) => {
  try {
    const result = await pool.query(
      `
      SELECT users.id,
      users.name,
      users.email,
      users.gender
      FROM friends
      INNER JOIN users
      ON users.id=friends.user_id
      WHERE friends.friend_id = $1
      AND friends.request_status = 'pending'
      `,
      [userId],
    );
    return result.rows;
  } catch (error) {
    throw error;
  }
};
const rejectFriendRequest = async (userId, friendId) => {
  try {
    const result = await pool.query(
      `DELETE FROM friends WHERE user_id = $1 AND friend_id=$2`,
      [userId, friendId],
    );
    if (result.rowCount === 0) {
      return { success: false, message: "Friend request not found" };
    }

    return { success: true, message: "Friend request rejected successfully" };
  } catch (error) {
    throw error;
  }
};
module.exports = { createFriend, getFriendRequests, rejectFriendRequest };
