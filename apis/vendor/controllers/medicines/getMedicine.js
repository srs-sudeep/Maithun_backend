const vendorSchema = require("../../models/vendor");
const medicine = require("../../../medicines/models/medicines");

async function vendorMedicine(req, res) {
  const id = req.body.uId;
  try {
    // Find the vendor using the provided ID
    const vendor = await vendorSchema.findById(id);

    if (!vendor) {
      return res.status(404).json({ error: "Vendor not found" });
    }

    // Fetch medicines using the extracted IDs
    const medicines = await medicine.find({ vendor: id });

    res.status(200).json(medicines);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "An error occurred while fetching medicines for the vendor",
    });
  }
}

module.exports = vendorMedicine;
