const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const RegC = require("../models/HomePageModels/reg"); 
require("dotenv").config();
const nodemailer = require("nodemailer");

const JWT_SECRET = process.env.JWT_SECRET || "12345"; 
const BASE_URL = "http://localhost:3000"; 

// exports.Registration = async (req, res) => {
//   const { name, password, email } = req.body;

//   try {
//     const lowerCaseEmail = email.toLowerCase();

//     const userExists = await RegC.findOne({ email: lowerCaseEmail });

//     if (userExists) {
//       return res.status(401).json({ status: 401, message: "Email is already registered" });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);
//     const newUser = new RegC({
//       name,
//       email: lowerCaseEmail,
//       password: hashedPassword,
     
//     });

//     await newUser.save();

//     const token = jwt.sign({ id: newUser._id, email: newUser.email }, JWT_SECRET, { expiresIn: "7d" });

//     res.status(201).json({
//       status: 201,
//       token,
//       apiData: newUser,
//       message: "Successfully registered",
      
//     });
//   } catch (error) {
//     res.status(400).json({ status: 400, message: error.message });
//   }
// };


exports.Registration = async (req, res) => {
  const { name, password, email } = req.body;

  try {
    const lowerCaseEmail = email.toLowerCase();

    const userExists = await RegC.findOne({ email: lowerCaseEmail });

    if (userExists) {
      return res.status(401).json({ status: 401, message: "Email is already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new RegC({
      name,
      email: lowerCaseEmail,
      password: hashedPassword,
      isVerified: false, // Add this field in your schema if not already
    });

    await newUser.save();

    // Generate verification token
    const verifyToken = jwt.sign(
      { id: newUser._id, email: newUser.email },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    // Setup email transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const verificationLink = `http://localhost:3000/verify-email/${verifyToken}`;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: newUser.email,
      subject: "Verify your email",
      html: `
        <p>Hi ${name},</p>
        <p>Thank you for registering. Please verify your email by clicking the link below:</p>
        <a href="${verificationLink}">Verify Email</a>
        <p>This link will expire in 24 hours.</p>
      `,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    res.status(201).json({
      status: 201,
      message: "Registration successful. Please check your email to verify your account.",
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({ status: 400, message: error.message });
  }
};

exports.Login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const lowerCaseEmail = email.toLowerCase();
    const user = await RegC.findOne({ email: lowerCaseEmail });

    if (!user) {
      return res.status(400).json({ status: 400, message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ status: 400, message: "Invalid email or password" });
    }

    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role || "user" // Default fallback if role is not present
      },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      status: 200,
      token,
      userData: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      message: `${email} successfully logged in`,
    });
  } catch (error) {
    res.status(500).json({ status: 500, message: "Internal server error" });
  }
};


exports.Logout = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1]; 

    if (!token) {
      return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    await RegC.findByIdAndUpdate(userId, { isActive: false });

    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
