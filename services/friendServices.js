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
const getFriendRequests = async (userId) => {
  try {
    const result = await friendModels.getFriendRequests(userId);
    return result;
  } catch (error) {
    throw error;
  }
};
const rejectFriendRequest = async (userId, friendId) => {
  try {
    const result = await friendModels.rejectFriendRequest(userId, friendId);

    if (result.success === false) {
      throw new Error(result.message);
    }
    return result.success;
  } catch (error) {
    throw error;
  }
};
const acceptingFriendRequests = async (userId, friendId) => {
  try {
    const result = await friendModels.acceptingFriendRequests(userId, friendId);

    if (result.success === false) {
      throw new Error(result.message);
    }
    return result.success;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  addFriend,
  getFriendRequests,
  rejectFriendRequest,
  acceptingFriendRequests,
};
