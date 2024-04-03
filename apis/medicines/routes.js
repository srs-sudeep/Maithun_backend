const express = require("express");
const router = express.Router();
const medicines = require("./controllers/medicines");
const getOrder = require("./controllers/orders/getOrder");
const confirmOrder = require("./controllers/orders/orderconfirmation");
const indi_medicines = require("./controllers/indi_medicines");
const authenticateMiddleware = require("./middleware/auth");

router.use(["/order*", "/getOrder*"], authenticateMiddleware);

router.get("/", medicines);
router.get("/indi/:id", indi_medicines);
router.get("/getOrder", getOrder);
router.post("/order", confirmOrder);

module.exports = router;
