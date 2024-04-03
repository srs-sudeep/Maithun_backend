const models = {
  medicines: require("../../../medicines/models/medicines"),
  Vendor: require("../../../vendor/models/vendor"),
};
const mongoose = require("mongoose");

async function postMedicine(req, res) {
  const id = req.body.uId;
  try {
    const {
      name,
      description,
      price,
      availability,
      content,
      category,
      discount,
      brand,
      healthCondition,
      images,
      usageSteps,
      ratings,
      whoCanUse,
      whoCantUse,
      precautions,
      sideEffects,
      safetyInfo,
      type,
      prescriptionRequired,
    } = req.body;

    // Check if the provided vendorId is valid
    const isValidVendorId = mongoose.Types.ObjectId.isValid(id);
    if (!isValidVendorId) {
      return res.status(400).json({ error: "Invalid vendorId" });
    }

    const vendors = await models.Vendor.findById(id);
    if (!vendors) {
      return res.status(404).json({ error: "Vendor not found" });
    }

    // Create new medicine linked to the vendor
    const newMedicine = new models.medicines({
      name,
      description,
      price,
      availability,
      content,
      category,
      discount,
      brand,
      healthCondition,
      images,
      vendor: id, // Use vendorId to link to the vendor
      usageSteps,
      ratings,
      whoCanUse,
      whoCantUse,
      precautions,
      sideEffects,
      safetyInfo,
      type,
      prescriptionRequired,
    });

    await newMedicine.save();
    res.status(201).json(newMedicine);
  } catch (error) {
    console.error(`Error creating medicine: ${error.message}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = postMedicine;
