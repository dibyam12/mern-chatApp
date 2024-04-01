const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const app = express();
app.use(express.json());

const userRegister = async (req, res) => {
  const users = mongoose.model("User");

  const { name, email, password } = req.body;
  let createUser;
  //Creation code
  const encryptedPassword = await bcrypt.hash(password, 10);
  try {
    createUser = await users.create({
      name,
      email,
      password: encryptedPassword,
    });
  } catch (error) {
    return res.status(400).json({
      status: "Error while creating user",
      message: error,
    });
  }

  /*  const userForAccessToken = await users.findOne({ // You can use getUser also instead of this 
    email,
  }); */

  const accessToken = jwt.sign(
    // jwt vaneko  logged in credentials store garney userko ra securly data haru transfer garney
    {
      //Payload
      _id: createUser._id,
      password: password,
    },
    process.env.jwt_salt //string used for verification if the data has been tampered or not
  );
  res.status(200).json({
    _id: createUser._id,
    name: createUser.name,
    email: createUser.email,
    isAdmin: createUser.isAdmin,
    token: accessToken,
  });
};

module.exports = userRegister;
