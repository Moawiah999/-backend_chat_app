const userService = require("../services/userService");

const register = async (req, res) => {
  try {
    const newUser = await userService.registerUser(req.body);
    res
      .status(201)
      .json({ success: true, message: "Account creation successful" });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
const loginUser = async (req, res) => {
  try {
    const token = await userService.loginUser(req.body);
    res.status(200).json({ success: true, token: token });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
module.exports = { register, loginUser };
