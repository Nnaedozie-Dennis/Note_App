// backend/models/Note.js
// Mongoose model for Note - defines the structure of notes in MongoDB

const mongoose = require("mongoose");

const NoteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
    },
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Links note to its owner (the user who created it)
      required: true,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt automatically
  }
);

// Export the model
// Collection will be "notes" in MongoDB
module.exports = mongoose.model("Note", NoteSchema);
