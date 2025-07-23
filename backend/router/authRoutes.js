const express = require("express");
const jwt = require("jsonwebtoken");
const RegC = require('../models/HomePageModels/reg'); // ✅ If your model file is RegC.js
const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

router.get("/verify-email/:token", async (req, res) => {
  const { token } = req.params;

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await RegC.findById(decoded.id);

    if (!user) {
      return res.status(400).send("Invalid token");
    }

    if (user.isVerified) {
      return res.send("Email already verified.");
    }

    user.isVerified = true;
    await user.save();

    res.send("✅ Email verified successfully. You can now log in.");
  } catch (error) {
    console.error(error);
    res.status(400).send("Invalid or expired token.");
  }
});

module.exports = router;
