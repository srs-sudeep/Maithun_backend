const { Buyer, Seller } = require("../../models/user");
const jwt = require("jsonwebtoken");

async function login(req, res) {
  const { email, password } = req.body;
  console.log(email, password);
  try {
    let user;
    user = await Buyer.findOne({ email, password });
    if (user) {
      const token = jwt.sign({ userId: user._id }, process.env.JWT_BUYER_SECRET_KEY, {
        expiresIn: "1h",
      });
      res.header("Authorization", `Bearer ${token}`);
      res.json({ success: true, user, token });
    } else {
      user = await Seller.findOne({ email, password });
      if (user) {
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SELLER_SECRET_KEY, {
          expiresIn: "1h",
        });
        res.header("Authorization", `Bearer ${token}`);
        res.json({ success: true, user, token });
      }
      else{
        res.status(401).json({ success: false, message: "Invalid credentials" });
      }
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

module.exports = login;
