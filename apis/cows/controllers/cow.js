const Cow = require("../models/cow");
const { Seller } = require("../../users/models/user");

const getCows = async (req, res) => {
  try {
    const cows = await Cow.find();
    res.json(cows);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getCowsBySellerId = async (req, res) => {
  try {
    const { sellerId } = req.params;
    console.log(sellerId)
    const cows = await Cow.find({ vendorId: sellerId });
    res.json(cows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const createCow = async (req, res) => {
  try {
    // Fetch the vendorName and vendorPhone from the Seller collection
    const seller = await Seller.findOne({ _id: req.body.vendorId });
    console.log(seller)
    if (!seller) {
      return res.status(404).json({ message: "Seller not found" });
    }
    const { name, phone } = seller;

    const cowData = {
      ...req.body,
      vendorName: name,
      vendorPhone: phone
    };

    // Create the cow object
    const cow = new Cow(cowData);
    
    // Save the cow object
    await cow.save();

    // Update the Seller document to push the new cow._id into the sellOrderIds array
    await Seller.findOneAndUpdate(
      { email: req.user.email },
      { $push: { sellOrderIds: cow._id } },
      { new: true }
    );

    // Send the cow and updated seller object in the response
    res.status(201).json({ cow, seller });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Bad Request" });
  }
};


const updateCow = async (req, res) => {
  try {
    const { id } = req.params;
    const cow = await Cow.findByIdAndUpdate(id, req.body, { new: true });
    if (!cow) {
      return res.status(404).json({ message: "Cow not found" });
    }
    res.json(cow);
  } catch (error) {
    res.status(400).json({ message: "Bad Request" });
  }
};

const deleteCow = async (req, res) => {
  try {
    const { id } = req.params;
    const cow = await Cow.findByIdAndDelete(id);
    if (!cow) {
      return res.status(404).json({ message: "Cow not found" });
    }

    const seller = await Seller.findOneAndUpdate(
      { email: req.user.email }, // Assuming you have stored seller's email in req.user.email after token verification
      { $pull: { sellOrderIds: cow._id } },
      { new: true }
    );

    res.json({ message: "Cow deleted successfully", seller });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  getCows,
  createCow,
  updateCow,
  deleteCow,
  getCowsBySellerId,
};
