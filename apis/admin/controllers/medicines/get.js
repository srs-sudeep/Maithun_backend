const mongoose = require("mongoose");
const adminInfo = require("../../models/adminInfo");

const models = {
  medicines: require("../../../medicines/models/medicines"),
  userInfo: require("../../../users/models/userInfo"),
  vendor: require("../../../vendor/models/vendor"),
};

async function getData(model, conditions = {}, sort = { createdAt: -1 }) {
  try {
    const data = await model.find(conditions).sort(sort);
    return data;
  } catch (error) {
    console.error(`Error fetching data from ${model.modelName}: ${error}`);
    throw new Error(`Error fetching data from ${model.modelName}`);
  }
}

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

async function handleRequestAsync(handler, req, res) {
  try {
    await handler(req, res);
  } catch (error) {
    console.error(`Error handling request: ${error.message}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function getMedicines(req, res) {
  try {
    const medicines = await models.medicines.find({}).exec();

    // Fetch vendor details for each medicine
    const medicinesWithVendor = await Promise.all(
      medicines.map(async (medicine) => {
        // Find vendor by ID
        const vendor = await models.vendor.findById(medicine.vendor);

        return {
          ...medicine.toObject(),
          vendorName: vendor.name,
        };
      })
    );

    res.send(medicinesWithVendor);
  } catch (error) {
    console.error(
      `Error fetching data from ${models.medicines.modelName}: ${error.message}`
    );
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function getIndiMedicines(req, res) {
  const id = req.params.id;
  try {
    const medicine = await getIndividualData(models.medicines, id);

    // Find vendor by ID
    const vendor = await models.vendor.findById(medicine.vendor);

    const medicineWithVendor = {
      ...medicine.toObject(),
      vendorName: vendor.name,
    };

    res.send(medicineWithVendor);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching individual blog data" });
  }
}

async function getUserinfo(req, res) {
  try {
    const data = await models.userInfo.find({}).exec();
    res.send(data);
  } catch (error) {
    console.error(`Error fetching data  ${error.message}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function getIndiUserinfo(req, res) {
  const id = req.params.id;
  try {
    const data = await getIndividualData(models.userInfo, id);
    res.send(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "An error occurred while fetching individual user info data",
    });
  }
}

async function getAdminInfo(req, res) {
  try {
    const users = await adminInfo.find({});
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching admin info data" });
  }
}

async function getIndiAdminInfo(req, res) {
  try {
    const id = req.params.id;
    const isValidObjectId = mongoose.Types.ObjectId.isValid(id);

    if (!isValidObjectId) {
      return res.status(400).json({ error: "Invalid ObjectId format" });
    }

    const users = await adminInfo.findById(id);

    if (!users) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "An error occurred while fetching individual admin info data",
    });
  }
}

module.exports = {
  getMedicines,
  getUserinfo,
  getIndiMedicines,
  getIndiUserinfo,
  getAdminInfo,
  getIndiAdminInfo,
};
