const express = require("express");
const router = express.Router();
const mapController = require("../controllers/MapControllers");

router.get("/getlocations", mapController.getLocations);

module.exports = router;
