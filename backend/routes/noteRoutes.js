// backend/routes/noteRoutes.js
// API endpoints for notes - all protected

const express = require("express");
const router = express.Router();
const {
  getNotes,
  createNote,
  updateNote,
  deleteNote,
  getSingleNote, // ← Add this import
} = require("../controllers/noteController");
const { protect } = require("../middleware/authMiddleware");

// All routes require authentication
router.route("/").get(protect, getNotes).post(protect, createNote);

// Add GET for single note + PUT and DELETE
router
  .route("/:id")
  .get(protect, getSingleNote) // ← This line is missing
  .put(protect, updateNote)
  .delete(protect, deleteNote);

module.exports = router;