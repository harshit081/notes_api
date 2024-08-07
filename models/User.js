const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isGoogleUser: {
    type: Boolean,
    default: false,
  },
  profileImage: {
    type: String,
    default: 'https://example.com/default-profile-image.png',
  },
  googleId: String,  // Added for Google login
  resetPasswordToken: String,
  resetPasswordExpires: Date,
});

const User = mongoose.model('User', userSchema);

module.exports = User;
