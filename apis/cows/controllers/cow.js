import Cow from "../models/cow.js";
async function getCows(req, res) {
  try {
    const cows = await Cow.find();
    res.json(cows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

module.exports = getCows;
