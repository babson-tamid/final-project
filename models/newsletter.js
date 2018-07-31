const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const User = require('./user');

const newsSchema = new Schema({
  creator: {type: Schema.Types.ObjectId, ref: 'User'},
  title: String, 
  description: String,
  imgPath: String
}, {
  timestamps: true
});

const Newsletter = mongoose.model('Newsletter', newsSchema);
module.exports = Newsletter;