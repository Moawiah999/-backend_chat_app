const friendService = require("../services/friendServices");
const addFriend = async (req, res) => {
  try {
    if (!req.body.friend_id)
      return res.status(400).json({ message: "friend id is required" });

    const result = await friendService.addFriend(
      req.user.id,
      req.body.friend_id,
    );
    res
      .status(200)
      .json({ success: true, message: "friend was added successfully" });
  } catch (error) {
    console.log(error);

    return res.status(400).json({ success: false, message: error.message });
  }
};
const getPendingRequests = async (req, res) => {
  try {
    const result = await friendService.getFriendRequests(req.user.id);
    res.status(200).json({
      success: true,
      message: "get all Pending Requests",
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch friend requests",
    });
  }
};
const rejectFriendRequest = async (req, res) => {
  try {
    const result = await friendService.rejectFriendRequest(
      req.user.id,
      req.body.friend_id,
    );
    res.status(200).json({
      success: true,
      message: "friend request was successfully deleted",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
module.exports = { addFriend, getPendingRequests, rejectFriendRequest };
