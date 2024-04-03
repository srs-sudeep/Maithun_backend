const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const vendor = require("../../models/vendor");
require("dotenv").config();

async function login(req, res) {
  const { email, password } = req.body;
  // console.log(req.body);
  try {
    if (!email || !password) {
      return res.status(400).json({ message: "Please enter all fields." });
    }

    const user = await vendor.findOne({ email: email });

    if (!user) {
      return res.status(400).json({ message: "Vendor does not exist" });
    } else {
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ message: "Incorrect password" });
      } else {
        const token = jwt.sign({ userId: user._id }, process.env.secret);
        // req.session.user = user._id;s
        console.log(token);
        console.log(token.length);
        res.cookie("token", token, {
          httpOnly: true,
          maxAge: 24 * 60 * 60 * 1000, // Cookie expires in 1 hour
          sameSite: "none",
          secure: true,
        });
        return res.status(201).json({ message: "Login successful" });
      }
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: "An error occurred while processing your request" });
  }
}

module.exports = login;
