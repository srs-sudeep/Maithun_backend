const express = require("express");
const router = express.Router();
const Order = require("./controllers/order");
const Verify = require("./controllers/verify");

router.post("/verify", Verify);
router.post("/orders", Order);

module.exports = router;
