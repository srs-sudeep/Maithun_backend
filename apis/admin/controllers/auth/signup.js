// Import required modules
const mongoose = require('mongoose');
const adminInfo = require('../../models/adminInfo');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Define the signup function
async function postAdminInfo(req, res) {
    // Extract required fields from the request body
    console.log(req.body);
    const { name, email, password } = req.body;

    // Perform validation
    if (!name || !email || !password) {
        return res.status(400).json({ message: "Signup: Please fill in all required fields." });
    }

    // Validate email format using regex
    if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(email)) {
        return res.status(400).json({ message: "Invalid Email. Please enter correct email." });
    }

    if (password.length < 5) {
        return res.status(400).json({ message: "Password should be at least 5 characters long." });
    }

    try {
        // Check if the admin with the given email already exists
        const existingAdmin = await adminInfo.findOne({ email: email });

        if (existingAdmin) {
            return res.status(400).json({ message: "Admin with this email already exists." });
        }

        // Hash the password before storing it
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new admin using the adminInfo schema
        const newAdmin = new adminInfo({
            name: name,
            email: email,
            password: hashedPassword, // Store the hashed password
        });

        // Save the admin to the database
        const id = await newAdmin.save();

        // Create a JWT token for the admin
        const token = jwt.sign({ adminId: id }, process.env.secret);

        // Set the JWT token in a cookie and send the response
        res.cookie('token', token, {
            httpOnly: true,
            maxAge: 60 * 60 * 1000, // Cookie expires in 1 hour
            sameSite: 'none',
            secure: true,
        });

        return res.status(201).json({ message: "Admin signup successful" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "An error occurred while processing your request" });
    }
}

// Export the signup function
module.exports = postAdminInfo;
