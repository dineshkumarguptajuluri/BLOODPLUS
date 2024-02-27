const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const User = require("../models/user");
const OtpMap = require("../models/otpMap");
const geolib = require("geolib");
const cron = require("node-cron");

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

exports.sendMail = async (req, res) => {
  const {
    fromEmail,
    toEmail,
    contactNo,
    optionalMessage,
    longitude,
    latitude,
  } = req.body;

  try {
    const accessToken = await oAuth2Client.getAccessToken();

    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "bloodplus.help@gmail.com",
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });

    const emailContent = {
      from: "BloodPlus 🩸 <bloodplus.help@gmail.com>",
      to: toEmail,
      subject: "⚠️🚨Emergency Request: Someone needs your help 🚨⚠️",
      text: `Someone needs your help. Please consider this emergency request. If you can help, please contact them using the provided email or phone number below:\n\nFrom Email: ${fromEmail}\nContact Number: ${contactNo}\n\n`,
      html: `
    <div style="background-color: #f2f2f2; padding: 20px; font-family: Arial, sans-serif;">
      <div style="text-align: center; padding: 20px;">
        <h1 style="color: #d9534f; font-size: 28px; margin: 20px 0; font-weight: bold;">🩸 Blood +</h1>
      </div>
      <h2 style="color: #d9534f; font-size: 24px; font-weight: bold;">Emergency Request</h2>
      <p style="font-size: 18px;">Someone needs your help. Please consider this emergency request.</p>
      <p style="font-size: 18px;">If you can help, please contact them using the provided email or phone number below:</p>
      <p style="font-size: 18px;"><strong>From Email:</strong> ${fromEmail}</p>
      <p style="font-size: 18px;"><strong>Contact Number:</strong> ${contactNo}</p>
      <p style="font-size: 18px; background-color: #dff0d8; padding: 10px; border-radius: 5px; margin-top: 20px;">${
        optionalMessage || ""
      }</p>
      <p style="font-size: 18px; margin-top: 15px;"><strong>Recipient's Location:</strong> <a href="https://www.google.com/maps?q=${latitude},${longitude}" target="_blank" rel="noopener noreferrer" style="color: #d9534f; text-decoration: none; font-weight: bold;">View on Google Maps</a></p>
    </div>
`,
    };

    const result = await transport.sendMail(emailContent);

    res.status(200).json({ emailsent: result });
  } catch (error) {
    console.error("Error sending Mail", error);
    res.status(500).json({ error: "Server error" });
  }
};

function formatDateAndTime(dateString) {
  const date = new Date(dateString);

  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-based
  const year = date.getFullYear();

  const hours = date.getHours() % 12 || 12; // Convert to 12-hour format
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const ampm = date.getHours() < 12 ? "AM" : "PM";

  return `${day}/${month}/${year} ${hours}:${minutes} ${ampm}`;
}

const sendCampaignMail = async (toEmail, campaign) => {
  try {
    const accessToken = await oAuth2Client.getAccessToken();

    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "bloodplus.help@gmail.com",
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });

    const emailContent = {
      from: "BloodPlus 🩸 <bloodplus.help@gmail.com>",
      to: toEmail,
      subject: "🩸🏕️Bloodplus Community Campaign Details🏕️🩸",
      html: `
    <div style="background-color: #f2f2f2; padding: 20px; font-family: Arial, sans-serif;">
      <div style="text-align: center; padding: 20px;">
        <h1 style="color: #d9534f; font-size: 28px; margin: 20px 0; font-weight: bold;">🩸 Blood +</h1>
      </div>
      <h2 style="color: #d9534f; font-size: 24px; font-weight: bold;">Community Campaign Details</h2>

      <p style="font-size: 18px;"><strong>Campaign Name:</strong> ${
        campaign.campname
      }</p>
      <p style="font-size: 18px;"><strong>Date & Time:</strong> ${formatDateAndTime(
        campaign.dateandtime
      )}</p>
      <p style="font-size: 18px;"><strong>Venue:</strong> ${campaign.venue}</p>
      <p style="font-size: 18px;"><strong>Address:</strong> ${
        campaign.address
      }</p>
      <p style="font-size: 18px;"><strong>Purpose:</strong> ${
        campaign.purpose
      }</p>
      <p style="font-size: 18px;"><strong>Conducted By:</strong> ${
        campaign.conductedby
      }</p>
      
      <p style="font-size: 18px; background-color: #dff0d8; padding: 10px; border-radius: 5px; margin-top: 20px;">${
        campaign.optionalmessage || ""
      }</p>
      <p style="font-size: 18px; margin-top: 15px;"><strong>Location:</strong> <a href="https://www.google.com/maps/search/?api=1&query=${
        campaign.latitude
      },${
        campaign.longitude
      }" target="_blank" rel="noopener noreferrer" style="color: #d9534f; text-decoration: none; font-weight: bold;">View on Google Maps</a></p>
      <p style="font-size: 18px; margin-top: 15px;"><strong>Form Link:</strong> <a href="${
        campaign.formlink
      }" target="_blank" rel="noopener noreferrer" style="color: #d9534f; text-decoration: none; font-weight: bold;">Click here to register</a></p>
      <p style="font-size: 18px; margin-top: 15px;"><strong>Shared from Bloodplus🩸 Community</strong></p>
    </div>`,
    };

    const result = await transport.sendMail(emailContent);

    return result;
  } catch (error) {
    console.error("Error sending Mail", error);
    res.status(500).json({ error: "Server error" });
  }
};

exports.sendMailToAll = async (req, res) => {
  const { campaign } = req.body;
  const { latitude, longitude } = campaign;

  try {
    // Fetch all users from the database
    const allUsers = await User.find({}); // Assuming you're using Mongoose for MongoDB

    // Filter users within 5 kilometers radius
    const usersInRadius = allUsers.filter((user) => {
      const userLongitude = user.longitude;
      const userLatitude = user.latitude;

      // Calculate distance using geolib library
      const distance = geolib.getDistance(
        { latitude, longitude },
        { latitude: userLatitude, longitude: userLongitude }
      );

      // Distance is in meters, convert it to kilometers
      const distanceInKm = distance / 1000;

      // Check if the user is within 5 kilometers
      return distanceInKm <= 5;
    });

    // Send emails to filtered users
    for (const user of usersInRadius) {
      //   // Create and send email similar to your existing logic
      const result = await sendCampaignMail(user.mailid, campaign);
      //   console.log(`Email sent to ${user.email}: ${result}`);
    }

    res.status(200).json({ emailsSent: usersInRadius.length });
  } catch (error) {
    console.error("Error sending Mail to all users", error);
    res.status(500).json({ error: "Server error" });
  }
};

function generateOTP(length) {
  const digits = "0123456789";
  let OTP = "";
  for (let i = 0; i < length; i++) {
    OTP += digits[Math.floor(Math.random() * 10)];
  }
  return OTP;
}

async function sendforgotOtp(email) {
  try {
    const user = await User.findOne({ mailid: email });
    if (!user) {
      return { error: "User not found", status: 404 };
    }

    const otp = generateOTP(6);

    let otpMapEntry = await OtpMap.findOne({ maild: email });

    if (!otpMapEntry) {
      // If the email doesn't exist, create a new entry
      otpMapEntry = new OtpMap({
        maild: email,
        otp: otp,
      });
    } else {
      // If the email exists, update the OTP
      otpMapEntry.otp = otp;
    }

    await otpMapEntry.save();

    const accessToken = await oAuth2Client.getAccessToken();

    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "bloodplus.help@gmail.com",
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });

    const emailContent = {
      from: "BloodPlus 🩸 <bloodplus.help@gmail.com>",
      to: email,
      subject: "🩸 Blood +: Forgot Password",
      html: `
    <div style="background-color: #f2f2f2; padding: 20px; font-family: Arial, sans-serif;">
      <div style="text-align: center; padding: 20px;">
        <h1 style="color: #d9534f; font-size: 28px; margin: 20px 0; font-weight: bold;">🩸 Blood +</h1>
      </div>
      <h2 style="color: #d9534f; font-size: 24px; font-weight: bold;">Forgot Password</h2>
      <p style="font-size: 18px;">Your OTP is <strong>${otp}</strong></p>
      <p style="font-size: 18px; margin-top: 15px;">This OTP is valid for 5 minutes.</p>
      <p style="font-size: 18px; margin-top: 15px;">If you didn't request this, please ignore this email.</p>
    </div>`,
    };

    const result = await transport.sendMail(emailContent);

    return { emailsent: result, otp };
  } catch (error) {
    console.error("Error sending OTP:", error);
    // Handle other errors here and return appropriate status codes
    return { error: "Server error", status: 500 };
  }
}

exports.sendforgotOtp = async (req, res) => {
  const { mailid: email } = req.body;

  try {
    const result = await sendforgotOtp(email);

    if (result.error) {
      // Handle the error and send an appropriate response with status code
      return res.status(result.status).json({ error: result.error });
    }

    // If OTP is sent successfully, return a success response
    res
      .status(200)
      .json({ message: "OTP sent successfully", emailsent: result.emailsent });
  } catch (error) {
    console.error("Error sending OTP:", error);
    res.status(500).json({ error: "Server error" });
  }
};

cron.schedule("*/5 * * * *", async () => {
  try {
    const fiveMinutesAgo = new Date();
    fiveMinutesAgo.setMinutes(fiveMinutesAgo.getMinutes() - 5);

    // Remove OTPs older than 5 minutes
    await OtpMap.deleteMany({ createdAt: { $lt: fiveMinutesAgo } });
    console.log("Removed expired OTPs");
  } catch (error) {
    console.error("Error removing expired OTPs:", error);
  }
});

exports.verifyOtp = async (req, res) => {
  const { mailid, otp } = req.body;

  try {
    // Check if the OTP exists in the database
    const otpMapEntry = await OtpMap.findOne({ maild: mailid });

    if (!otpMapEntry) {
      // If the OTP entry doesn't exist, it has expired or is invalid
      return res.status(404).json({ error: "OTP has expired or not found" });
    }

    if (otpMapEntry.otp === otp) {
      // If the OTP matches, it's valid
      return res.status(200).json({ message: "OTP is valid" });
    } else {
      // If the OTP doesn't match, it's invalid
      return res.status(400).json({ error: "Invalid OTP" });
    }
  } catch (error) {
    console.error("Error checking OTP:", error);
    res.status(500).json({ error: "Server error" });
  }
};
