// backend/models/User.js
// Mongoose model for User - defines the structure of user data in MongoDB

const mongoose = require("mongoose");

// Define the User schema (blueprint for user documents)
const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true, // Name is mandatory
      trim: true, // Removes extra spaces
    },
    email: {
      type: String,
      required: true,
      unique: true, // No two users can have same email
      lowercase: true, // Saves email as lowercase
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6, // Password must be at least 6 characters
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Create and export the model
// 'User' is the collection name in MongoDB (will be "users" plural)
module.exports = mongoose.model("User", UserSchema);
