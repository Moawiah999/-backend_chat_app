const express = require("express");
const { authentication } = require("../middleware/authentication");
const {
  addFriend,
  getPendingRequests,
  rejectFriendRequest,
  acceptingFriendRequests,
} = require("../controllers/friendController");
const friendRouter = express.Router();
friendRouter.get("/pending-requests", authentication, getPendingRequests);
friendRouter.post("/add-friend", authentication, addFriend);
friendRouter.patch(
  "/accepting-friend-requests",
  authentication,
  acceptingFriendRequests,
);
friendRouter.delete("/reject-requests", authentication, rejectFriendRequest);
module.exports = friendRouter;
