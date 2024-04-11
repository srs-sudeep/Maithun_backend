const express = require("express");
const router = express.Router();
const cowController = require("./controllers/cow");

const {buyerTokenVerify, sellerTokenVerify} = require("../users/middleware/auth");
const { getCows, createCow, updateCow, deleteCow, getCowsBySellerId } = require("./controllers/cow");

router.get("/", getCows);
router.get("/vendor/:sellerId", sellerTokenVerify, getCowsBySellerId);
router.post("/", sellerTokenVerify, createCow);
router.put("/:id", sellerTokenVerify, updateCow);
router.delete("/:id", sellerTokenVerify, deleteCow);

module.exports = router;
