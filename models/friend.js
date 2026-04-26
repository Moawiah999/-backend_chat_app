const pool = require("../config/db");

const createFriend = async (userId, friendId) => {
  try {
    const result = await pool.query(
      `
      INSERT INTO friends (sender_id,receiver_id) VALUES ($1, $2) RETURNING *
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
      ON users.id=friends.sender_id
      WHERE friends.receiver_id = $1
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
      `DELETE FROM friends WHERE sender_id = $1 AND receiver_id=$2`,
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

const acceptingFriendRequests = async (userId, friendId) => {
  try {
    const result = await pool.query(
      `
      UPDATE friends SET request_status = 'accepted' 
      WHERE sender_id = $1 AND receiver_id=$2

      `,
      [userId, friendId],
    );

    if (result.rowCount === 0) {
      return { success: false, message: "fail accepting Friend" };
    }
    return { success: true, message: "Friend request accepting successfully" };
  } catch (error) {
    console.log(error);

    throw error;
  }
};
module.exports = {
  createFriend,
  getFriendRequests,
  rejectFriendRequest,
  acceptingFriendRequests,
};
