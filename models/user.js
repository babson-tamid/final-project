const mongoose = require('mongoose');
const Schema   = mongoose.Schema;




const userSchema = new Schema({
  email: String,
  password: String,
  name: String,
  position: String,
  gradDate: String,
  phoneNum: String,
  linkedInUrl: String,
  role: { 
    type: String, 
    enum: ['admin', 'member', 'applicant'], 
    default:'member' 
  },
  // resume: String,
  profilePic: String  

}, {
  timestamps: true
});

const User = mongoose.model('User', userSchema);




module.exports = User;