// Import required modules
const mongoose = require("mongoose");
const vendor = require("../../models/vendor");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Define the signup function
async function postvendor(req, res) {
  // Extract required fields from the request body
  console.log(req.body);
  const {
    name,
    address,
    password,
    email,
    phoneNo,
    ratings,
    description,
    link,
  } = req.body;

  // Perform validation
  if (
    !name ||
    !address ||
    !email ||
    !password ||
    !phoneNo ||
    !ratings ||
    !description ||
    !link
  ) {
    return res
      .status(400)
      .json({ message: "Please provide all required fields" });
  }

  // Validate email format using regex
  if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(email)) {
    return res
      .status(400)
      .json({ message: "Invalid Email. Please enter correct email." });
  }

  if (password.length < 5) {
    return res
      .status(400)
      .json({ message: "Password should be at least 5 characters long." });
  }

  try {
    // Check if the vendor with the given email already exists
    const existingVendor = await vendor.findOne({ email: email });

    if (existingVendor) {
      return res
        .status(400)
        .json({ message: "Vendor with this email already exists." });
    }

    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new vendor using the vendor schema
    const newVendor = new vendor({
      name: name,
      email: email,
      password: hashedPassword,
      address,
      description,
      phoneNo,
      link,
      ratings: ratings || 0, // Store the hashed password
    });

    // Save the vendor to the database
    const id = await newVendor.save();

    // Create a JWT token for the vendor
    const token = jwt.sign({ vendorId: id }, process.env.secret);

    // Set the JWT token in a cookie and send the response
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 60 * 60 * 1000, // Cookie expires in 1 hour
      sameSite: "none",
      secure: true,
    });

    return res.status(201).json({ message: "Vendor signup successful" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "An error occurred while processing your request" });
  }
}

// Export the signup function
module.exports = postvendor;
