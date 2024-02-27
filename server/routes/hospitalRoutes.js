const express = require("express");
const router = express.Router();
const hospitalController = require("../controllers/hospitalController");

router.get("/getHospitals", hospitalController.getHospitals);

module.exports = router;
