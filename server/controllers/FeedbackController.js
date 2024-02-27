const Feedbacks = require("../models/feedbacks");

exports.getFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedbacks.find().sort({ date: -1 });
    res.json(feedbacks);
  } catch (error) {
    res.status(500).json({ message: "Error fetching feedbacks" });
  }
};

exports.createFeedbacks = async (req, res) => {
  const { mailid, name, feedback, stars } = req.body;

  try {
    // Create a new feedback document
    const newFeedback = new Feedbacks({
      mailid,
      name,
      feedback,
      stars,
      date: new Date(),
    });

    // Save the feedback to the database
    await newFeedback.save();

    res.status(201).json({ message: "Feedback submitted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error submitting feedback" });
  }
};
