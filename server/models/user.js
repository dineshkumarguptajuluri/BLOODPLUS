const mongoose = require("mongoose");

const User = mongoose.model("users", {
  username: String,
  mailid: String,
  password: String,
  terms: Boolean,
  bloodgroup: String,
  contact: Number,
  longitude: Number,
  latitude: Number,
});

module.exports = User;
