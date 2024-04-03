const userInfo = require("../../models/userInfo");

// Endpoint to get the items in the user's cart
async function cartGet(req, res) {
  try {
    // Find the user by ID
    const user = await userInfo.findById(req.body.uId);

    // Check if the user exists
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const cartCount = user.cart.length;

    res.json({ cart: user.cart, cartCount });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

module.exports = cartGet;
