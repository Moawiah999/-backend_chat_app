const express = require("express");
require("dotenv").config();
const app = express();
app.use(express.json());
require("./config/db");
const PORT = process.env.PORT;
const user = require("./routes/user");
const friend = require("./routes/friend");
app.use("/users", user);
app.use("/friends", friend);
app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
