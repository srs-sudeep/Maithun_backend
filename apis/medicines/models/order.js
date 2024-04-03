// order.js

const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Assuming you have a User model
    required: true,
  },
  medicines: [
    {
      medicine: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Medicine",
        required: true,
      },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
      prescriptionUploaded: { type: Boolean, required: true, default: false },
      discount: { type: Number, required: true, default: 0 },
      vendor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Vendor",
        required: true,
      },
    },
  ],
  total: { type: Number, required: true },
  transactionId: { type: String, required: true, unique: true },
  orderDate: { type: Date, default: Date.now },
  order_id: { type: String, required: true },
  payment_id: { type: String, required: true },
  signature: { type: String, required: true },
});

module.exports = mongoose.model("Order", orderSchema);
