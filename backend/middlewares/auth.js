const jwt = require("jsonwebtoken");
require("dotenv").config();

const auth = (req, res, next) => {
  // next is used in middleware to pass from middleware
  // Auth logic is written here..........

  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({
      status: "failed",
      message: "Authorization failed! you must login",
    });
  }
  //check auth header
  try {
    const token = authHeader.split("Bearer ")[1];
    const checkToken = jwt.verify(token, process.env.jwt_salt);
    req.user = checkToken;
  } catch (error) {
    return res.status(401).json({
      status: "failed",
      error, //error:error same ho
    });
  }

  next();
};

module.exports = auth;
