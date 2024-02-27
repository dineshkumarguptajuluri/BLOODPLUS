const express = require("express");
const router = express.Router();
const campsController = require("../controllers/CampsController");

router.get("/getcampaigns", campsController.getCampaigns);
router.post("/createcampaigns", campsController.createCampaign);

module.exports = router;
