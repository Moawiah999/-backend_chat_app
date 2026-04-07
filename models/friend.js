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
        ON friends.friend_id = users.id
        WHERE friends.request_status='pending' AND friends.user_id=$1
        `,
      [userId],
    );
    return result.rows;
  } catch (error) {
    throw error;
  }
};
module.exports = { createFriend, getFriendRequests };
