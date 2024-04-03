const express = require("express");
const router = express.Router();
const vendor = require("./controllers/vendor/vendor");
const logout = require("./controllers/auth/logout");
const authenticateMiddleware = require("./middleware/auth");
const postVendor = require("./controllers/auth/signup");
const login = require("./controllers/auth/login");
const verify = require("./controllers/auth/verify");
const vendorMedicine = require("./controllers/medicines/getMedicine");
const vendorIndiMedicine = require("./controllers/medicines/getIndiMedicine");
const postMedicine = require("./controllers/medicines/postMedicine");

router.use(["/logout*", "/vendorprofile", "/medicine"], authenticateMiddleware);

//Medicine Part
router.get("/verify", verify);
router.post("/login", login);
router.post("/signup", postVendor);
router.get("/logout", logout);
router.post("/postvendor", postVendor);

// Medicine part
router.get("/vendorprofile", vendor);
router.get("/medicine", vendorMedicine);
router.get("/medicine/:medicineId", vendorIndiMedicine);
router.post("/medicine", postMedicine);
// router.get("/indi/:id", indi_medicines);
//   router.get("/headers", headers);
//   router.get("/", blog_card);

module.exports = router;
