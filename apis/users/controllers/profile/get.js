const { Seller, Buyer } = require("../../models/user");

async function profile(req, res) {
  try {
    const { email } = req.body;
    console.log(email);
    const user = await Seller.findOne({ email: email });
    if (user) {
      res.status(200).json({ user });
    } else {
      const user = await Buyer.findOne({ email: email });
      res.status(200).json({ user });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error saving profile: " + error.message });
  }
}

module.exports = profile;
