const mongoose = require("mongoose");
const adminInfo = require("../../models/adminInfo");

const models = {
  medicines: require("../../../medicines/models/medicines"),
  userInfo: require("../../../users/models/userInfo"),
  vendor: require("../../../vendor/models/vendor"),
  orders: require("../../../medicines/models/order"),
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
async function getOrders(req, res) {
  try {
    const orders = await models.orders.find({}).exec();
    // Fetch details for each order, including user, medicine, and vendor names
    const ordersWithDetails = await Promise.all(
      orders.map(async (order) => {
        // Populate user details
        const user = await models.userInfo.findById(order.user);

        // Populate details for each medicine in the order
        const medicinesWithDetails = await Promise.all(
          order.medicines.map(async (medicine) => {
            const medicineDetails = await models.medicines
              .findById(medicine.medicine)
              .select("name") // Assuming "name" is a field in the Medicine model
              .exec();

            const vendorDetails = await models.vendor
              .findById(medicine.vendor)
              .select("name") // Assuming "name" is a field in the Vendor model
              .exec();

            return {
              ...medicine.toObject(),
              medicineName: medicineDetails.name,
              vendorName: vendorDetails.name,
            };
          })
        );

        return {
          ...order.toObject(),
          userName: user.name,
          medicines: medicinesWithDetails,
        };
      })
    );

    res.send(ordersWithDetails);
  } catch (error) {
    console.error(
      `Error fetching data from ${models.orders.modelName}: ${error.message}`
    );
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function getIndiOrders(req, res) {
  const { orderId } = req.params;

  try {
    // Find the order by ID
    const order = await models.orders.findById(orderId).exec();

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    // Populate user details
    const user = await models.userInfo.findById(order.user);

    // Populate details for each medicine in the order
    const medicinesWithDetails = await Promise.all(
      order.medicines.map(async (medicine) => {
        const medicineDetails = await models.medicines
          .findById(medicine.medicine)
          .select("name") // Assuming "name" is a field in the Medicine model
          .exec();

        const vendorDetails = await models.vendor
          .findById(medicine.vendor)
          .select("name") // Assuming "name" is a field in the Vendor model
          .exec();

        return {
          ...medicine.toObject(),
          medicineName: medicineDetails.name,
          vendorName: vendorDetails.name,
        };
      })
    );

    const orderWithDetails = {
      ...order.toObject(),
      userName: user.name,
      medicines: medicinesWithDetails,
    };

    res.send(orderWithDetails);
  } catch (error) {
    console.error(
      `Error fetching data from ${models.orders.modelName}: ${error.message}`
    );
    res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = { getOrders, getIndiOrders };
