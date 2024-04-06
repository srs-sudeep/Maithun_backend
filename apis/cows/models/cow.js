const mongoose = require("mongoose");

const cowSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  vendorId: {
    type: String,
    required: true
  },
  gender: {
    type: Number,
    required: true,
    enum: [0, 1] // 0 for male and 1 for female
  },
  age: {
    type: Number,
    required: true
  },
  hornSize: {
    type: Number,
    required: true
  },
  imageUrls: {
    type: [String],
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  dateAdded: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model('Cow', cowSchema);

