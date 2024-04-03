///////////////////////////////////////////////////////////////IMPORTS/////////////////////////////////////////////////////////////
const express = require("express");
const router = express.Router();
const {
  getMedicines,
  getIndiMedicines,
  getUserinfo,
  getIndiUserinfo,
  getAdminInfo,
  getIndiAdminInfo,
} = require("./controllers/medicines/get");
const { postMedicine, postUserInfo } = require("./controllers/medicines/post");
const postVendor = require("./controllers/vendors/post");
const {
  getVendorInfo,
  getIndiVendorInfo,
} = require("./controllers/vendors/get");
const { getOrders, getIndiOrders } = require("./controllers/orders/get");
const { getBlogs, getIndiBlogs } = require("./controllers/blogs/getBlogs");
const PostBlogs = require("./controllers/blogs/postBlogs");
const authverification = require("./middleware/auth");
const login = require("./controllers/auth/login");
const verify = require("./controllers/auth/verify");
const logout = require("./controllers/auth/logout");
const postAdminInfo = require("./controllers/auth/signup");

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

router.get("/verify", verify);
router.post("/login", login);
router.get("/logout", logout);
router.post("/signup", postAdminInfo);
router.use(authverification);

///////////////////////////////////////////////////////////////GET/////////////////////////////////////////////////////////////////

router.get("/medicines/", getMedicines);
router.get("/medicines/indi/:id", getIndiMedicines);
router.get("/medicines/userinfo", getUserinfo);
router.get("/medicines/userinfo/indi/:id", getIndiUserinfo);
router.get("/", getAdminInfo);
router.get("/indi/:id", getIndiAdminInfo);
router.get("/vendor", getVendorInfo);
router.get("/vendor/:id", getIndiVendorInfo);
router.get("/blogs", getBlogs);
router.get("/blogs/:id", getIndiBlogs);
router.get("/orders", getOrders);
router.get("/orders/:orderId", getIndiOrders);
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////POST//////////////////////////////////////////////////////////////

router.post("/medicines/userinfo", postUserInfo);
router.post("/medicines", postMedicine);
router.post("/vendor", postVendor);
router.post("/blogs", PostBlogs);
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////PATCH/////////////////////////////////////////////////////////////

// router.post("/blogs/edit/:id",patchBlogs );
// router.post("/blogs/commune/edit/:id",patchCommune );
// router.post("/blogs/interaction/edit/:id",patchInteraction );
// router.post("/blogs/hero/edit/:id",patchHero);
// router.post("/blogs/notification/edit/:id",patchNotification );
// router.post("/blogs/userinfo/edit/:id",patchuserInfo );
// router.post("/edit/:id", patchAdminInfo );

// ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// /////////////////////////////////////////////////////////////////DELETE////////////////////////////////////////////////////////////

// router.get("/blogs/delete/:id",deleteBlogs );
// router.get("/blogs/commune/delete/:id",deleteCommune );
// router.get("/blogs/interaction/delete/:id",deleteInteraction );
// router.get("/blogs/hero/delete/:id",deleteHero);
// router.get("/blogs/notification/delete/:id",deleteNotification );
// router.get("/blogs/userinfo/delete/:id",deleteUserinfo );
// router.get("/delete/:id", deleteAdminInfo);

module.exports = router;
