const UserInfo = require("../../models/userInfo");
const mongoose = require("mongoose");

// Route to add an item to the user's cart
async function cartPost(req, res) {
  try {
    const { medicineId } = req.body;
    let { quantity } = req.body;
    quantity = parseInt(quantity);
    console.log(typeof quantity);

    // Check if the medicineId is valid
    if (!mongoose.Types.ObjectId.isValid(medicineId)) {
      return res.status(400).json({ message: "Invalid medicine ID" });
    }

    // Check if the quantity is a positive number
    if (typeof quantity !== "number" || quantity <= 0) {
      console.log(quantity);
      return res.status(400).json({ message: "Invalid quantity" });
    }
    const user = await UserInfo.findById(req.body.uId);
    const index = user.cart.findIndex(
      (item) => item.medicineId.toString() === medicineId
    );

    // Find the user and update the cart
    if (index !== -1) {
      // If the medicine exists, update the quantity
      user.cart[index].quantity = quantity;
    } else {
      // If the medicine doesn't exist, add a new item to the cart
      user.cart.push({ medicineId, quantity });
    }
    const updatedUser = await user.save();

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ user: updatedUser, message: "Item added to cart successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

module.exports = cartPost;
