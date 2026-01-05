// backend/routes/noteRoutes.js
// API endpoints for notes - all protected

const express = require("express");
const router = express.Router();
const {
  getNotes,
  createNote,
  updateNote,
  deleteNote,
} = require("../controllers/noteController");
const { protect } = require("../middleware/authMiddleware");

// All routes require authentication
router.route("/").get(protect, getNotes).post(protect, createNote);

router.route("/:id").put(protect, updateNote).delete(protect, deleteNote);

module.exports = router;
