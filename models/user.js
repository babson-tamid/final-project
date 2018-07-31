const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const userSchema = new Schema({
  email: String,
  password: String,
  name: String,
  gradDate: String,
  phoneNum: String,
  admin: Boolean
  // resume: String,
  // profilePic: String




}, {
  timestamps: true
});

const User = mongoose.model('User', userSchema);
module.exports = User;