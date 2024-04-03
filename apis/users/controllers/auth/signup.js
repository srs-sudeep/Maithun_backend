// signup.js

const User = require('../../models/user');

async function signup(req, res) {
  const { name, email, password, type, phone, address } = req.body;
  
  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'User already exists' });
    }

    // Create a new user
    const newUser = new User({
      name,
      email,
      password,
      type,
      phone,
      address,
    });

    // Save the new user to the database
    await newUser.save();

    res.json({ success: true, message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
}

module.exports = signup;
