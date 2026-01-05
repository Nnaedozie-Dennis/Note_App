// backend/routes/authRoutes.js
// Defines the API endpoints for authentication

const express = require("express");
const router = express.Router(); // ← This line is crucial!
const { register, login, demo } = require("../controllers/authController");

// POST /api/auth/register - Create new account
router.post("/register", register);

// POST /api/auth/login - Log in existing user
router.post("/login", login);

// POST /api/auth/demo - Instant guest access
router.post("/demo", demo);

module.exports = router; // ← Export the router
