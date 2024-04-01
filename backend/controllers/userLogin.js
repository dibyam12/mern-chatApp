const mongoose = require("mongoose");
const express = require("express");

const bcrypt = require("bcrypt");
const app = express();
app.use(express.json());

const userLogin = async (req, res) => {
  const users = mongoose.model("User");

  const { email, password } = req.body;

  const getUser = await users.findOne({ email: email });
  //validations
  try {
    if (!email) {
      throw "please provide an email";
    }

    if (!password) {
      throw "please provide a password";
    }

    if (!getUser) {
      throw "Invalid Email";
    }

    const matched = await bcrypt.compare(password, getUser.password);

    if (!matched) throw " Invalid Password ";
  } catch (e) {
    return res.status(400).json({
      status: "Failed",
      message: e,
    });
  }

  res.status(200).json({
    message: "User Logged in Successfully",
    _id: getUser._id,
    name: getUser.name,
    email: getUser.email,
    isAdmin: getUser.isAdmin,
  });
};

module.exports = userLogin;
