const jwt = require("jsonwebtoken");
const { Buyer, Seller } = require("../models/user");

function buyerTokenVerify(req, res, next) {
  const token = req.headers.authorization; 
  if (!token) {
    return res.status(401).json({ message: "Unauthorized: Missing token" });
  }

  jwt.verify(token.split(' ')[1], process.env.JWT_BUYER_SECRET_KEY, async (err, user) => {
    if (err) {
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }

    try {
      const existUser = await Buyer.findOne({ _id: user.userId });
      if (existUser) {
        console.log("Token verified");
        req.body.uId = user.userId;
        next();
      } else {
        console.log("Token not verified");
        return res.status(401).json({ message: "Unauthorized: User not found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
}

function sellerTokenVerify(req, res, next) {
  const token = req.headers.authorization; 
  if (!token) {
    return res.status(401).json({ message: "Unauthorized: Missing token" });
  }

  jwt.verify(token.split(' ')[1], process.env.JWT_SELLER_SECRET_KEY, async (err, user) => {
    if (err) {
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }

    try {
      const existUser = await Seller.findOne({ _id: user.userId });
      if (existUser) {
        console.log("Token verified");
        // Pass the seller's email to the request object
        req.user = { email: existUser.email };
        next();
      } else {
        console.log("Token not verified");
        return res.status(401).json({ message: "Unauthorized: User not found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
}


module.exports = { buyerTokenVerify, sellerTokenVerify };
