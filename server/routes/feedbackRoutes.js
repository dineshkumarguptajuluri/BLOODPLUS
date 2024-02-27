const express = require("express");
const router = express.Router();
const feedbackController = require("../controllers//FeedbackController");

router.get("/getfeedbacks", feedbackController.getFeedbacks);
router.post("/createfeedbacks", feedbackController.createFeedbacks);

module.exports = router;
