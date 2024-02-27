const Campaigns = require("../models/campaigns");

exports.getCampaigns = async (req, res) => {
  try {
    const campaigns = await Campaigns.find();
    res.json(campaigns);
  } catch (error) {
    console.error("Error while fetching user data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.createCampaign = async (req, res) => {
  try {
    const campaignData = req.body;
    const requiredFields = [
      "campname",
      "dateandtime",
      "venue",
      "address",
      "longitude",
      "latitude",
      "purpose",
      "conductedby",
      "formlink",
    ];
    const missingFields = requiredFields.filter(
      (field) => !campaignData[field]
    );

    if (missingFields.length > 0) {
      return res.status(400).json({
        message: `Missing required fields: ${missingFields.join(", ")}`,
      });
    }

    const newCampaign = new Campaigns(campaignData);
    await newCampaign.save();
    res.status(201).json({ message: "Campaign created successfully" });
  } catch (error) {
    console.error("Error creating campaign:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
