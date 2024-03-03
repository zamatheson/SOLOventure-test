// Import necessary modules
const mongoose = require('mongoose');

// Define the User schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true 
  }, 
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create and export the User model
module.exports = mongoose.model('user', userSchema);
