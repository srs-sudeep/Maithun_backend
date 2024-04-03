const mongoose = require("mongoose");
const models = {
  medicines: require("../models/medicines"),
  Vendor: require("../../vendor/models/vendor"), // Import Vendor model
};

async function getIndividualData(model, id) {
  try {
    const data = await model.findById(id);
    return data;
  } catch (error) {
    console.error(
      `Error fetching individual data from ${model.modelName}: ${error}`
    );
    throw new Error(`Error fetching individual data from ${model.modelName}`);
  }
}

async function getIndiMedicineinfo(req, res) {
  const id = req.params.id;
  try {
    const medicineData = await getIndividualData(models.medicines, id);

    // Fetch vendor name using the vendor ID from medicineData
    const vendorId = medicineData.vendor;
    const vendor = await models.Vendor.findById(vendorId);
    if (!vendor) {
      return res.status(404).json({ error: "Vendor not found" });
    }

    // Add vendor name to medicineData
    const medicineWithVendorName = {
      ...medicineData.toObject(), // Convert Mongoose document to plain object
      vendorName: vendor.name, // Add vendor name to the object
    };

    res.send(medicineWithVendorName);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "An error occurred while fetching individual medicine info data",
    });
  }
}

module.exports = getIndiMedicineinfo;
