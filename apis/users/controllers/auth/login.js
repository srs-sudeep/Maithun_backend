// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// const userInfo = require("../../models/userInfo");
// require("dotenv").config();
// const DB = process.env.DB;
const user = require("../../models/user");

async function login(req, res) {
  const { email, password } = req.body;
  try {
    const user = await user.findOne({ email, password });
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
