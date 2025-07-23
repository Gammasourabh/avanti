const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // Your Gmail
    pass: process.env.EMAIL_PASS, // Your Gmail App Password
  },
});

const mailOptions = {
  from: process.env.EMAIL_USER,
  to: "your_email@gmail.com", // Put your own email here
  subject: "Test Email from Nodemailer",
  html: "<p>This is a <strong>test email</strong> using Nodemailer</p>",
};

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.log("❌ Error sending email:", error);
  } else {
    console.log("✅ Email sent successfully:", info.response);
  }
});
