// backend/controllers/noteController.js
// Handles note CRUD operations - only for authenticated users

const Note = require("../models/Note");

// GET all notes for the logged-in user
exports.getNotes = async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user._id }).sort({
      createdAt: -1,
    });
    res.json(notes);
  } catch (error) {
    console.error("Get notes error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// CREATE new note
exports.createNote = async (req, res) => {
  const { title, content, tags } = req.body;

  try {
    const note = new Note({
      title,
      content,
      tags: tags || [],
      user: req.user._id,
    });

    const createdNote = await note.save();
    res.status(201).json(createdNote);
  } catch (error) {
    console.error("Create note error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// UPDATE note
exports.updateNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    // Check ownership
    if (note.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const updatedNote = await Note.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.json(updatedNote);
  } catch (error) {
    console.error("Update note error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// DELETE note
exports.deleteNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    // Check ownership
    if (note.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    await note.deleteOne();
    res.json({ message: "Note removed" });
  } catch (error) {
    console.error("Delete note error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
