// signup.js

const { Buyer, Seller } = require("../../models/user");

async function signup(req, res) {
  const { name, email, password, isSeller, phone, userLocality } = req.body;

  console.log(name, email, password, isSeller, phone, userLocality);

  try {
    let existingUser;
    if (isSeller) {
      existingUser = await Seller.findOne({ email });
    } else {
      existingUser = await Buyer.findOne({ email });
    }
  
    if (existingUser) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }
  
    const newUser = isSeller ? new Seller({
      name,
      email,
      password,
      isSeller,
      phone,
      userLocality,
    }) : new Buyer({
      name,
      email,
      password,
      isSeller,
      phone,
      userLocality,
    });
  
    await newUser.save();
  
    res.json({ success: true, message: isSeller ? "Seller registered successfully" : "Buyer registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
  
}

module.exports = signup;
