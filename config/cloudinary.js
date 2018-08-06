const cloudinary = require("cloudinary");
const cloudinaryStorage = require("multer-storage-cloudinary");
const multer = require("multer");
const path = require('path');


cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret
});

var theStorage = cloudinaryStorage({
  cloudinary: cloudinary,
  folder: 'folder-folder', // The name of the folder in cloudinary
  allowedFormats: ['jpg', 'png'],
  filename: function (req, file, cb) {
    cb(null, file.originalname); 
    // cb(null, 'my-file-name');
  }
});
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, './public/uploads/')
//   },
//   filename: (req, file, cb) => {
//     cb(null, `${Date.now()}${path.extname(file.originalname)}`)
//   }
// });

const uploadCloud = multer({ storage: theStorage })

module.exports = uploadCloud;

