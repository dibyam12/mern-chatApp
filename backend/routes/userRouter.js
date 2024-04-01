const express = require("express");
const auth = require("../middlewares/auth");
const userRegister = require("../controllers/userRegister");
const userLogin = require("../controllers/userLogin");

const app = express();
app.use(express.json());

const userRouter = express.Router();

userRouter.post("/register", userRegister);
userRouter.post("/login", userLogin);

userRouter.use(auth);

module.exports = userRouter;
