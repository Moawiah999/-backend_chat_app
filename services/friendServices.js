const friendModels = require("../models/friend");
const addFriend = async (userId, friendId) => {
  try {
    const result = await friendModels.createFriend(userId, friendId);
    return result;
  } catch (error) {
    if (error.code === "23505") {
      throw new Error("Friend already exists");
    }
  }
};
module.exports = { addFriend };
