const express = require("express");
require("dotenv").config();
const app = express();
app.use(express.json());
require("./config/db");
const PORT = process.env.PORT;
const user = require("./routes/user");
app.use("/users", user);
app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
