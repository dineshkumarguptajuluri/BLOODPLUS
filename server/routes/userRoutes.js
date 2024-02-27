const express = require("express");
const router = express.Router();
const userController = require("../controllers/UserController");

router.post("/signup", userController.signUp);
router.post("/login", userController.logIn);
router.get("/getdonorcounts", userController.getDonorCounts);
router.post("/updateusername", userController.updateUsername);
router.post("/updatecontact", userController.updateContact);
router.post("/updatepassword", userController.updatePassword);
router.post("/updateaddress", userController.updateAddress);

module.exports = router;
