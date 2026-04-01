const userService = require("../services/userService");

const register = async (req, res) => {
  try {
    const newUser = await userService.registerUser(req.body);
    res.status(201).json({ success: true, user: newUser });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
module.exports = { register };
