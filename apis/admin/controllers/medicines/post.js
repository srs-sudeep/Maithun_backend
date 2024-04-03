const bcrypt = require("bcrypt");
const models = {
  medicines: require("../../../medicines/models/medicines"),
  userInfo: require("../../../users/models/userInfo"),
  adminInfo: require("../../models/adminInfo"),
  Vendor: require("../../../vendor/models/vendor"),
};

const mongoose = require("mongoose");
async function postMedicine(req, res) {
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
      vendorId, // Change to vendorId
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

    console.log(req);
    // Check if the provided vendorId is valid
    const isValidVendorId = mongoose.Types.ObjectId.isValid(vendorId);
    if (!isValidVendorId) {
      return res.status(400).json({ error: "Invalid vendorId" });
    }

    const vendors = await models.Vendor.findById(vendorId);
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
      vendor: vendorId, // Use vendorId to link to the vendor
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

async function postUserInfo(req, res) {
  try {
    // Extract necessary fields from the request body
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "Please enter all required fields." });
    }
    const existingUser = await models.userInfo.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({
        message: "Email is already registered. Please choose a different one.",
      });
    }
    const saltRounds = 12; // Adjust according to your security needs
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    // Create a new user info instance
    const newUserinfo = new models.userInfo({
      name,
      email,
      hashedPassword,
    });

    // Save the user info to the database
    await newUserinfo.save();

    res
      .status(201)
      .json({ message: `User created successfully: ${newUserinfo}` });
  } catch (error) {
    console.error(`Error creating user info: ${error.message}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = {
  postMedicine,
  postUserInfo,
};
