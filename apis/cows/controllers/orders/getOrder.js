const models = {
  order: require("../../models/order"),
  medicine: require("../../models/medicines"),
  vendor: require("../../../vendor/models/vendor"),
};

async function getOrder(req, res) {
  const { userId } = req.body;

  try {
    // Find orders where the user ID matches
    const orders = await models.order.find({ user: userId });

    // Iterate through orders
    const ordersWithDetails = await Promise.all(
      orders.map(async (order) => {
        // Fetch details for each medicine in the order
        const medicinesWithDetails = await Promise.all(
          order.medicines.map(async (medicine) => {
            // Find medicine by ID
            const medicineDetails = await models.medicine.findById(
              medicine.medicine
            );

            // Find vendor by ID
            const vendorDetails = await models.vendor.findById(
              medicineDetails.vendor
            );

            return {
              quantity: order.quantity,
              price: order.price,
              prescriptionUploaded: medicine.prescriptionUploaded,
              discount: medicine.discount,
              medicineName: medicineDetails.name,
              vendorName: vendorDetails.name,
            };
          })
        );

        return {
          total: order.total,
          transactionId: order.transactionId,
          orderDate: order.orderDate,
          order_id: order.order_id,
          payment_id: order.payment_id,
          signature: order.signature,
          medicines: medicinesWithDetails,
        };
      })
    );

    res.json(ordersWithDetails);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

module.exports = getOrder;
