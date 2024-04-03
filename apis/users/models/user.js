const mongoose = require("mongoose");

const user = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: String,
  type: String,
  phone: String,
  address: String,
});

module.exports = mongoose.model("user", user);
