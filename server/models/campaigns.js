const mongoose = require("mongoose");

const Campaigns = mongoose.model("campaigns", {
  campname: String,
  dateandtime: Date,
  venue: String,
  address: String,
  longitude: Number,
  latitude: Number,
  purpose: String,
  conductedby: String,
  formlink: String,
});

module.exports = Campaigns;
