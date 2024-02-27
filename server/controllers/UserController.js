const User = require("../models/user");

exports.signUp = async (req, res) => {
  try {
    const userData = req.body;
    const requiredFields = [
      "username",
      "mailid",
      "password",
      "terms",
      "bloodgroup",
      "contact",
      "longitude",
      "latitude",
    ];

    // Check if all required fields are present
    const missingFields = requiredFields.filter((field) => !userData[field]);
    if (missingFields.length > 0) {
      return res.status(400).json({
        message: `Missing required fields: ${missingFields.join(", ")}`,
      });
    }

    // Check if the email already exists
    const existingUser = await User.findOne({ mailid: userData.mailid });
    if (existingUser) {
      return res.status(400).json({
        message: "Email already exists",
      });
    }

    const newUser = new User(userData);
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.logIn = async (req, res) => {
  try {
    const { mailid, password } = req.body;
    const user = await User.findOne({ mailid });

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }
    if (password !== user.password) {
      return res.status(402).json({ message: "Invalid password" });
    }
    res.status(200).json({
      message: "Login successful",
      userEmail: user.mailid,
      username: user.username,
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getDonorCounts = async (req, res) => {
  try {
    // Define an array of possible blood types
    const possibleBloodTypes = [
      "A+",
      "A-",
      "B+",
      "B-",
      "O+",
      "O-",
      "AB+",
      "AB-",
    ];

    // Create an initial count map with counts initialized to 0
    const bloodTypeCountsMap = {};
    possibleBloodTypes.forEach((type) => {
      bloodTypeCountsMap[type] = 0;
    });

    // Count the actual occurrences of each blood type
    const bloodTypeCounts = await User.aggregate([
      {
        $group: {
          _id: "$bloodgroup",
          count: { $sum: 1 },
        },
      },
    ]);

    // Populate the count map with actual counts
    bloodTypeCounts.forEach((typeCount) => {
      bloodTypeCountsMap[typeCount._id] = typeCount.count;
    });

    // Get the count of all donors
    const allDonorsCount = Object.values(bloodTypeCountsMap).reduce(
      (acc, count) => acc + count,
      0
    );

    res.status(200).json({
      allDonorsCount,
      bloodTypeCounts: bloodTypeCountsMap,
    });
  } catch (error) {
    console.error("Error fetching donor counts:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.updateUsername = async (req, res) => {
  try {
    const { mailid, newUsername, password } = req.body;
    const user = await User.findOne({ mailid });
    console.log(user);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (password !== user.password) {
      return res.status(401).json({ message: "Invalid password" });
    }
    user.username = newUsername;
    await user.save();
    res.status(200).json({ message: "Username updated successfully" });
  } catch (error) {
    console.error("Error updating username:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.updateContact = async (req, res) => {
  try {
    const { mailid, newcontact, password } = req.body;
    const user = await User.findOne({ mailid });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (password !== user.password) {
      return res.status(401).json({ message: "Invalid password" });
    }
    user.contact = newcontact;
    await user.save();
    res.status(200).json({ message: "Contact updated successfully" });
  } catch (error) {
    console.error("Error updating contact:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.updatePassword = async (req, res) => {
  try {
    const { mailid, newpassword, oldpassword } = req.body;
    const user = await User.findOne({ mailid });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (oldpassword !== user.password) {
      return res.status(401).json({ message: "Invalid password" });
    }
    user.password = newpassword;
    await user.save();
    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Error updating password:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.updateAddress = async (req, res) => {
  try {
    const { mailid, address, longitude, latitude, password } = req.body;
    const user = await User.findOne({ mailid });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (password !== user.password) {
      return res.status(401).json({ message: "Invalid password" });
    }
    user.address = address;
    user.longitude = longitude;
    user.latitude = latitude;
    await user.save();
    res.status(200).json({ message: "Address updated successfully" });
  } catch (error) {
    console.error("Error updating address:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
