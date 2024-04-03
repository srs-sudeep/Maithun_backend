const mongoose = require("mongoose");
const Vendor = require("../../../vendor/models/vendor");
async function getVendorInfo(req, res) {
  try {
    const users = await Vendor.find({});
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching admin info data" });
  }
}
async function getIndiVendorInfo(req, res) {
  try {
    const id = req.params.id;
    const isValidObjectId = mongoose.Types.ObjectId.isValid(id);

    if (!isValidObjectId) {
      return res.status(400).json({ error: "Invalid ObjectId format" });
    }

    const users = await Vendor.findById(id);

    if (!users) {
      return res.status(404).json({ message: "Vendor not found" });
    }

    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "An error occurred while fetching individual Vendor info data",
    });
  }
}
module.exports = { getVendorInfo, getIndiVendorInfo };
