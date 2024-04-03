const UserInfo = require("../../models/userInfo");

// Route to delete an item from the user's cart
async function cartDelete(req, res) {
  try {
    const { uId } = req.body; // Assuming the user ID is stored in the request body
    const updatedUser = await UserInfo.findByIdAndUpdate(
      uId,
      {
        $pull: { cart: { _id: req.params.cartItemId } },
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "Item deleted successfully", updatedUser });
  } catch (error) {
    console.error("Error deleting item from cart:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

module.exports = cartDelete;
