const mongoose = require("mongoose");

const vendorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  address: { type: String, required: true },
  email: { type: String, required: true },
  phoneNo: { type: String, required: true },
  ratings: { type: Number, default: 0 },
  password: { type: String },
});

const Vendor = mongoose.model("Vendor", vendorSchema);

module.exports = Vendor;
