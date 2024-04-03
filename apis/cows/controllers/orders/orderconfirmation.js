// ordersController.js
const generateTransactionId = require("../../utils/generateTransaction");
const Order = require("../../models/order");
const UserInfo = require("../../../users/models/userInfo");
const Medicine = require("../../../medicines/models/medicines"); // Replace with the actual path to your Medicine model

async function confirmOrder(req, res) {
  const { userId, order_id, payment_id, signature } = req.body; // Add any required data from frontend

  try {
    // Fetch user's cart
    const user = await UserInfo.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the user has items in the cart
    if (!user.cart || user.cart.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    // Create a new order
    const newOrder = new Order({
      user: userId,
      transactionId: generateTransactionId(),
      order_id: order_id,
      payment_id: payment_id,
      signature: signature,
    });

    // Populate order's medicines array from the user's cart
    for (const cartItem of user.cart) {
      try {
        // Fetch details of the medicine using medicineId
        const medicineDetails = await Medicine.findById(cartItem.medicineId);

        if (!medicineDetails) {
          // Handle the case where medicine details are not found
          console.error(
            `Medicine details not found for ${cartItem.medicineId}`
          );
          continue;
        }

        newOrder.medicines.push({
          medicine: cartItem.medicineId,
          quantity: cartItem.quantity,
          price: medicineDetails.price,
          prescriptionUploaded: cartItem.prescriptionUploaded,
          discount: medicineDetails.discount,
          vendor: medicineDetails.vendor, // Assuming medicineDetails has a vendor field
        });

        // Decrease the availability of each medicine
        medicineDetails.availability -= cartItem.quantity;
        await medicineDetails.save();
      } catch (error) {
        console.error("Error fetching medicine details:", error);
      }
    }

    // Calculate the total amount for the order
    newOrder.total = newOrder.medicines.reduce(
      (total, medicine) => total + medicine.price * medicine.quantity,
      0
    );

    // Set the order date
    newOrder.orderDate = new Date();

    // Save the new order
    await newOrder.save();

    // Clear user's cart
    user.cart = [];
    await user.save();

    return res.status(200).json({
      message: "Order confirmed successfully",
      orderId: newOrder._id,
    });
  } catch (error) {
    console.error("Error confirming order:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

module.exports = confirmOrder;
