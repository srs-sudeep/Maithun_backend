const medicineSchema = require("../models/medicines");
const Vendor = require("../../vendor/models/vendor"); // Import Vendor model

async function medicines(req, res) {
  try {
    let query = medicineSchema.find();

    // Check if the 'limit' query parameter is provided
    if (req.query.limit) {
      const limit = parseInt(req.query.limit);
      query = query.limit(limit);
    }

    const medicines = await query.exec();

    // Create an array to store results with vendor names
    const medicinesWithVendorNames = [];

    // Iterate through medicines and fetch vendor names
    for (const medicine of medicines) {
      const vendorId = medicine.vendor;

      // Find vendor by ID
      const vendor = await Vendor.findById(vendorId);
      if (!vendor) {
        return res.status(404).json({ error: "Vendor not found" });
      }

      // Append medicine data with vendor name
      const medicineWithVendorName = {
        ...medicine.toObject(), // Convert Mongoose document to plain object
        vendorName: vendor.name, // Add vendor name to the object
      };

      medicinesWithVendorNames.push(medicineWithVendorName);
    }
    res.json(medicinesWithVendorNames);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

module.exports = medicines;
