const userInfo = require("../../models/userInfo");

async function updateProfile(req, res) {
  // const { uId, newAddress, selectedAddress } = req.body;
  const { uId, name, email, phone, newAddress, selectedAddress } = req.body;
  console.log(name);
  try {
    const user = await userInfo.findById(uId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Handle the case where newAddress is undefined or null
    const addressToAdd = newAddress ? { address: newAddress } : null;
    // Update name, email, and phone if provided
    if (name !== undefined && name !== null) {
      user.name = name;
    }

    if (email !== undefined && email !== null) {
      user.email = email;
    }

    if (phone !== undefined && phone !== null) {
      user.phoneno = phone;
    }
    // Set the new address in the user's savedAddresses
    if (addressToAdd) {
      user.savedAddresses.push(addressToAdd);
    }

    // If selectedAddress is provided, set it directly
    if (selectedAddress !== undefined && selectedAddress !== null) {
      user.selectedAddress = selectedAddress;
    } else {
      // Set the newly added address as the selectedAddress
      user.selectedAddress =
        user.savedAddresses[user.savedAddresses.length - 1]?._id || null;
    }

    await user.save();

    return res.status(200).json({
      message: "Profile updated successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phoneno: user.phoneno,
        savedAddresses: user.savedAddresses,
        selectedAddress: user.selectedAddress,
      },
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

module.exports = updateProfile;
