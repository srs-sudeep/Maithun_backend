const userInfo = require("../../models/user");

async function profile(req, res) {
  try {
    const { uId } = req.body;
    const user = await userInfo.findById(uId);
    res.status(200).json({ user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error saving profile: " + error.message });
  }
}

module.exports = profile;
