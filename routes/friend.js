const express = require("express");
const { authentication } = require("../middleware/authentication");
const { addFriend } = require("../controllers/friendController");
const friendRouter = express.Router();
friendRouter.post("/add-friend", authentication, addFriend);
module.exports = friendRouter;
