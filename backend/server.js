const express = require("express");
const mongoose = require("mongoose");
const userRouter = require("./routes/userRouter");

require("dotenv").config();

const app = express();
app.use(express.json());

// -------------------Database Connection-----------------------------
mongo_connect = process.env.mongo_connect;

mongoose
  .connect(mongo_connect, {})
  .then(() => {
    console.log("Database Connected Successfully");
  })
  .catch((error) => {
    console.log(`Database connection failed!!! ${error}`);
  });
// -----------------------------------------------------------------

//Models
require("./models/userModel");
require("./models/chatModel");
require("./models/messageModel");

const chats = require("./data/data");
const auth = require("./middlewares/auth");

app.use("/api/user", userRouter);

app.use(auth);

const Port = process.env.PORT;
app.listen(Port, () => {
  console.log(`server running on port ${Port}`);
});
