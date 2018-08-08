const express    = require('express');
const userDetails = express.Router();
const bcrypt     = require('bcryptjs');
const session    = require('express-session');
const passport   = require('passport');

const cloudinary = require('cloudinary');
const uploadCloud = require('../config/cloudinary');

const User       = require('../models/user');


userDetails.get('/userDetails/:id', (req, res, next) => {
    
});

userDetails.post('/userDetails', (req, res, next) => {
    passport.authenticate('local', (err, theUser, failureDetails) => {
      if (err) {
        res.status(500).json({ message: 'Something went wrong' });
        return;
      }
  
      if (!theUser) {
        res.status(401).json(failureDetails);
        return;
      }
  
      req.login(theUser, (err) => {
        if (err) {
          res.status(500).json({ message: 'Something went wrong' });
          return;
        }
  
        // We are now logged in (notice req.user)
        res.status(200).json(req.user);
      });
    })(req, res, next);
  });

  
//   userDetails.post ('/resume', uploadCloud.single('image'),(req, res, next) => {
//       console.log("hererererer: ", req.file.url)
//       console.log(req.user)
      
//       User.findById(req.user._id)
//       .then( (foundUser) => {
          
//           foundUser.resume = req.file.url;
          
          
//           foundUser.save((err) => {
//               if (err) {
//                   res.status(400).json({ message: 'Something went wrong' });
//                   return;
//                 }
                
//             });
            
//         });
        
        
//     });


    userDetails.post ('/profilePic', uploadCloud.single('image'),(req, res, next) => {
        console.log("hererererer: ", req.file.url)
        console.log(req.user)
        
        User.findById(req.user._id)
        .then( (foundUser) => {
            
            foundUser.profilePic = req.file.url;
            
            
            foundUser.save((err) => {
                if (err) {
                    res.status(400).json({ message: 'Something went wrong' });
                    return;
                  }
                  
              });
              
          });
          
          
      });

    userDetails.post('/deleteProfilePic/:id', (req, res, next) =>{
        User.findByIdAndRemove(req.user._id)
        .then((foundUser)=>{
            foundUser.profilePic = req.file.url;
            res.json(foundUser.profilePic);
        })
        .catch((err)=>{
            res.json(err);
        })
    })


    
    
    
  module.exports = userDetails;