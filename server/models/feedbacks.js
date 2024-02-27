const mongoose = require("mongoose");

const Feedbacks = mongoose.model("feedbacks", {
  mailid: String,
  name: String,
  feedback: String,
  stars: Number,
  date: Date,
});

module.exports = Feedbacks;
