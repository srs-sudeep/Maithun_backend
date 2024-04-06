const mongoose = require("mongoose");

const buyerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  isSeller: {
    type: Boolean,
    default: false,
  },
  phone: {
    type: String,
    unique: true,
    required: true,
  },
  userLocality: {
    type: String,
    unique: true,
    required: true,
  },
});

const sellerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  isSeller: {
    type: Boolean,
    default: false,
  },
  phone: {
    type: String,
    unique: true,
    required: true,
  },
  userLocality: {
    type: String,
    unique: true,
    required: true,
  },
  sellOrderIds: {
    type: [mongoose.Schema.Types.ObjectId],
    default: [],
  },
});

const Buyer = mongoose.model("buyer", buyerSchema);
const Seller = mongoose.model("seller", sellerSchema);

module.exports = {
  Buyer,
  Seller
};

