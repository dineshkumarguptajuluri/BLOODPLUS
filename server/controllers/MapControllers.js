const User = require("../models/user");

exports.getLocations = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error("Error while fetching user data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
