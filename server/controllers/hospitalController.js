const Hospitals = require("../models/hospitals");

exports.getHospitals = async (req, res) => {
  try {
    const hospitals = await Hospitals.find();
    res.json(hospitals);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
