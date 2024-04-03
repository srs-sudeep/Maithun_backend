const express = require("express");
const router = express.Router();
const allBlogs = require("./controllers/AllBlogs");
const indiBlogs = require("./controllers/IndiBlogs");
router.get("/", allBlogs);
router.get("/:id", indiBlogs);

module.exports = router;
