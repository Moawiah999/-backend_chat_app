const userModels = require("../models/user");
const bcrypt = require("bcryptjs");
const registerUser = async (userData) => {
  try {
    const { password } = userData;

    const passwordHash = await bcrypt.hashSync(password, 10);
    console.log("password_hash : ", passwordHash);
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
module.exports = { registerUser };
