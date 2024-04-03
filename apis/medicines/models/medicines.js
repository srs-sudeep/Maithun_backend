const mongoose = require("mongoose");

const medicineSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  availability: { type: Number, default: true },
  content: { type: String, default: true },
  category: { type: String, required: true },
  discount: { type: Number, default: 0 },
  brand: { type: String, required: true },
  healthCondition: { type: String, required: true },
  vendor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Vendor",
    required: true,
  },
  type: { type: String, default: "allopathy", required: true },
  prescriptionRequired: { type: Boolean, default: false, required: true },
  images: [{ type: String }], // Array of image paths or URLs
  usageSteps: [{ type: String }], // List of steps on how to use the medicine
  ratings: { type: Number, default: 0 }, // Ratings for the medicine
  whoCanUse: [{ type: String }], // List of people who can use the medicine
  whoCantUse: [{ type: String }], // List of people who can't use the medicine
  precautions: [{ type: String }], // List of precautions
  sideEffects: [{ type: String }], // List of side effects
  safetyInfo: [{ type: String }], // List of safety information
});

module.exports = mongoose.model("medicineSchema", medicineSchema);
