const vendorSchema = require("../../models/vendor");
const medicine = require("../../../medicines/models/medicines");

async function vendor(req, res) {
  const id = req.body.uId;
  try {
    const vendor = await vendorSchema.findById(id);
    res.status(200).json(vendor);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "An error occurred while fetching all the vendor data",
    });
  }
}

module.exports = vendor;

