const express = require("express");
const router = express.Router();
const login = require("./controllers/auth/login");
const signup = require("./controllers/auth/signup");
const logout = require("./controllers/auth/logout");
// const profileGet = require("./controllers/profile/get");
// const auth = require("./middleware/auth");
// const cartGet = require("./controllers/cart/get");
// const cartPost = require("./controllers/cart/post");
// const editCartItem = require("./controllers/cart/edit");
// const cartDelete = require("./controllers/cart/delete");
// const updateProfile = require("./controllers/profile/edit");
//Auth middleware for all the login apis.
// router.use(["/profile*", "/logout*", "/verify*", "/cart*"], auth);

// Routers for auth apis
router.post("/login", login);
router.post("/signup", signup);
router.get("/logout", logout);

//Routers for profle page apis
// router.get("/profile", profileGet);
// router.post("/profile/edit", updateProfile);

//Router for cart page apis
// router.get("/cart", cartGet);
// router.post("/cart/add", cartPost);
// router.post("/cart/edit", editCartItem);
// router.delete("/cart/delete/:cartItemId", cartDelete);
module.exports = router;
