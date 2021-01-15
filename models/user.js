const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, maxlength: 20 },
  lastname: { type: String, required: true, maxlength: 20 },
  email: { type: String, trim: true, unique: true, required: true },
  password: { type: String, required: true, minlength: 5 },
  role: { type: Number, default: 0 },
  token: { type: String },
  tokenExp: { type: Number },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
