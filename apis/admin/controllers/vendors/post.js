const Vendor = require("../../../vendor/models/vendor");

async function postVendor(req, res) {
  try {
    const { name, address, email, phoneNo, ratings, description, link } =
      req.body;

    // Validate request data
    console.log(req.body);
    if (
      !name ||
      !address ||
      !email ||
      !phoneNo ||
      !ratings ||
      !description ||
      !link
    ) {
      return res
        .status(400)
        .json({ message: "Please provide all required fields" });
    }

    // Create new vendor
    const newVendor = new Vendor({
      name,
      address,
      description,
      email,
      phoneNo,
      link,
      ratings: ratings || 0,
    });

    // Save vendor to the database
    const savedVendor = await newVendor.save();

    res.status(201).json(savedVendor);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while processing your request" });
  }
}

module.exports = postVendor;
