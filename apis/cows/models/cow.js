const mongoose = require("mongoose");

const cow = new mongoose.Schema({
  name: String,
  vendor: String,
  phoneNo: String,
  imageUrl: String,
  price: Number,
  description: String
});

module.exports = mongoose.model("cow", cow);
