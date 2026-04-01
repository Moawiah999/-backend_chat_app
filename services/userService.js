const userModels = require("../models/user");
const bcrypt = require("bcryptjs");
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
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  } catch (error) {
    throw error;
  }
};
module.exports = { registerUser, loginUser };
