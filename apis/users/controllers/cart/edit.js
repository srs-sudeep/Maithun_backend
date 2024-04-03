const userInfo = require("../../models/userInfo");

async function editCartItem(req, res) {
  const { uId, cartItemId, newQuantity, newAddress } = req.body;

  try {
    const user = await userInfo.findById(uId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const cartItem = user.cart.find(
      (item) => item._id.toString() === cartItemId
    );

    if (!cartItem) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    if (newQuantity !== undefined) {
      // If newQuantity is provided, update the quantity
      cartItem.quantity = newQuantity;
    }

    // Check if newAddress is provided and not empty
    if (newAddress !== undefined && newAddress.trim() !== "") {
      cartItem.address = newAddress.trim();
    } else {
      // If newAddress is empty or not provided, set it to null
      cartItem.address = null;
    }

    await user.save();

    return res.status(200).json({
      message: "Cart item updated successfully",
      cart: user.cart,
      address: user.address,
    });
  } catch (error) {
    console.error("Error updating cart item:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

module.exports = editCartItem;
