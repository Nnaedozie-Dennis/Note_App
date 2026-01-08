

// Import required packages
const express = require("express"); // Web framework for Node.js
const mongoose = require("mongoose"); // ODM for MongoDB - makes database work easier
const dotenv = require("dotenv"); // Loads environment variables from .env file
const cors = require("cors"); // Allows frontend (localhost:3000) to talk to backend
const authRoutes = require("./routes/authRoutes");
const noteRoutes = require("./routes/noteRoutes");

// Load environment variables from .env file
// This gives us access to PORT, MONGO_URI, JWT_SECRET
dotenv.config();

// Create Express app
const app = express();

// Middleware - functions that run on every request
// app.use(
//   cors({
//     origin: "http://localhost:3000", // Allow only our frontend to access backend
//     // Later, when deploying, we'll change this to your live frontend URL
//   })
// );

app.use(
  cors({
    origin: [
      "http://localhost:3000", // Local development
      "https://your-vercel-app.vercel.app", // Your live frontend URL
    ],
  })
);

app.use(express.json()); // Parse incoming JSON requests (e.g., from login/register forms)

// Mount auth routes
app.use("/api/auth", authRoutes);

// Mount note routes
app.use("/api/notes", noteRoutes);

// Temporary test route - visit https://note-app-k88k.onrender.com/ to see this message
app.get("/", (req, res) => {
  res.send("Note App Backend is running! 🎉");
});

// --------------------------
// Routes will be added here later
// Example:
// const authRoutes = require('./routes/authRoutes');
// const noteRoutes = require('./routes/noteRoutes');
// app.use('/api/auth', authRoutes);
// app.use('/api/notes', noteRoutes);
// --------------------------

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected successfully");
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1); // Stop the server if DB fails
  });

// Set the port (from .env or default to 5000)
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`Visit http://localhost:${PORT} to test`);
});
