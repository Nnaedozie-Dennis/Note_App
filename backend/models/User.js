// backend/models/User.js
// Mongoose model for User - defines the structure of user data in MongoDB

const mongoose = require("mongoose");

// Define the User schema (blueprint for user documents)
const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true, 
      trim: true, 
    },
    email: {
      type: String,
      required: true,
      unique: true, 
      lowercase: true, 
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6, 
    },
  },
  {
    timestamps: true, 
  }
);

// Create and export the model
// 'User' is the collection name in MongoDB (will be "users" plural)
module.exports = mongoose.model("User", UserSchema);
