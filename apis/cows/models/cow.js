const mongoose = require("mongoose");

const cowSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  vendorId: {
    type: String,
    required: true,
  },
  vendorName: {
    type: String,
    required: true,
  },
  vendorPhone: {
    type: Number,
    required: true,
  },
  gender: {
    type: String,
    required: true,
    enum: ["male", "female"], // 0 for male and 1 for female
  },
  age: {
    type: Number,
    required: true,
  },
  hornSize: {
    type: Number,
    required: true,
  },
  imageUrls: {
    type: [String],
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  dateAdded: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Cow", cowSchema);
