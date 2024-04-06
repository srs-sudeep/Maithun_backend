const express = require("express");
const router = express.Router();

const users = require("./users/routes");
const cows = require("./cows/routes");

router.use("/users", users);
router.use("/cows", cows);

module.exports = router;
