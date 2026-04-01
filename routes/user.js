const express = require("express");
const {
  register,
  loginUser,
  allUsers,
} = require("../controllers/user_controller");
const { authentication } = require("../middleware/authentication");
const userRouter = express.Router();
userRouter.get("/", authentication, allUsers);
userRouter.post("/register", register);
userRouter.post("/login", loginUser);
module.exports = userRouter;
