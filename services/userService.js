const userModels = require("../models/user");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const registerUser = async (userData) => {
  try {
    const { password } = userData;

    const passwordHash = await bcrypt.hashSync(password, 10);
    const infoUsre = {
      ...userData,
      password: passwordHash,
    };
    const newUser = await userModels.createUser(infoUsre);
    return newUser;
  } catch (error) {
    if ((error.code = "23505")) {
      throw new Error("Duplicate email");
    }
  }
};
const loginUser = async (userData) => {
  try {
    const user = await userModels.getUserByEmail(userData);
    if (!user) {
      throw new Error("User not found");
    }

    const isMatch = await bcrypt.compare(userData.password, user.password);
    if (!isMatch) {
      throw new Error("Incorrect password");
    }

    const token = jwt.sign(
      {
        id: user.id,
        name: user.name,
        email: user.email,
        gender: user.gender,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      },
    );

    return token;
  } catch (error) {
    throw error;
  }
};
const getAllUsers = async (email) => {
  try {
    const allUsers = await userModels.getAllUsers(email);
    return allUsers;
  } catch (error) {
    throw error;
  }
};
module.exports = { registerUser, loginUser, getAllUsers };
