// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// const userInfo = require("../../models/userInfo");
// require("dotenv").config();
// const DB = process.env.DB;
const User = require("../../models/user");

async function login(req, res) {
  const { name, password } = req.body;
  console.log(name, password);
  try {
    const user = await User.findOne({ name, password });
    if (user) {
      req.session.user = user;
      res.json({ success: true, user });
    } else {
      res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
}

module.exports = login;
