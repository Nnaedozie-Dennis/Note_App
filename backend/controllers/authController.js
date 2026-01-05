// backend/controllers/authController.js
// Handles user authentication logic: register, login, and demo access

const User = require("../models/User");
const bcrypt = require("bcryptjs"); // For hashing passwords securely
const jwt = require("jsonwebtoken"); // For creating login tokens (JWT)

// REGISTER - Create a new user
exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password (never save plain text)
    const salt = await bcrypt.genSalt(10); // 10 is the strength
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    user = new User({
      name,
      email,
      password: hashedPassword,
    });
    await user.save();

    // Create JWT token (proof of login)
    const token = jwt.sign(
      { userId: user._id }, // Payload - what info to store in token
      process.env.JWT_SECRET, // Secret key from .env
      { expiresIn: "7d" } // Token expires in 7 days
    );

    // Send success response with token and user info
    res.status(201).json({
      message: "User registered successfully",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// LOGIN - Verify user and give token
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Compare entered password with hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Create JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// DEMO - Instant guest access (no signup needed)
exports.demo = async (req, res) => {
  try {
    // Look for existing demo user
    let demoUser = await User.findOne({ email: "demo@noteapp.com" });

    // Create if doesn't exist
    if (!demoUser) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash("demo123", salt);

      demoUser = new User({
        name: "Guest User",
        email: "demo@noteapp.com",
        password: hashedPassword,
      });
      await demoUser.save();
      console.log("Demo user created");
    }

    // Generate token for demo user
    const token = jwt.sign({ userId: demoUser._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({
      message: "Demo login successful",
      token,
      user: {
        id: demoUser._id,
        name: demoUser.name,
        email: demoUser.email,
      },
    });
  } catch (error) {
    console.error("Demo login error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
