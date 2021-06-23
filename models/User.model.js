const mongoose = require('mongoose');
const EMAIL_PATTERN = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      trim: true,
      required: [true, 'Username is required'],
      unique: true
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      trim : true,
      lowercase: true,
      match: [EMAIL_PATTERN, 'Invalid email pattern']
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [8, 'Password needs at least 8 chars']
    }
  },
  {
    timestamps: true
  }
)

const User = mongoose.model('User', userSchema);

module.exports = User;