const express    = require('express');
const authRoutes = express.Router();
const bcrypt     = require('bcryptjs');
const session    = require('express-session');
const passport   = require('passport');

const cloudinary = require('cloudinary');
const uploadCloud = require('../config/cloudinary');

const User       = require('../models/user');


authRoutes.post('/checkemail', (req, res, next) => {
  const email = req.body.email;
  console.log('backend: ',email)

  User.findOne({ email }, (err, foundUser) => {
    if (!foundUser) {
      res.status(400).json({ message: 'Email is not registered with Babson Tamid' });
      return;
    } else {
      console.log('user is: ', foundUser)
      res.status(200).json(foundUser);
    }
  })
})



// this is a comment
authRoutes.post('/user/:id/finish-signup', uploadCloud.array('images', 2), (req, res, next) => {

  console.log(req.files[0])
    
  const email = req.body.email;
  const password = req.body.password;
  const name = req.body.name;
  const gradDate = req.body.gradDate;
  const phoneNum = req.body.phoneNum;
  const role = req.body.role;
  // const thePic = req.files[0].url;
  // const profilePic = `/uploads/${req.file.filename}`;
   

  // if(req.file){
  //   newEntry.image = req.file.url;
      // const theImages = req.files;
      // theImages.forEach(eachImg =>{
      //     console.log("each image:", eachImg);
      //     newEntry.image.push(eachImg.url);
      // });
  // }
  
    if (!password) {
      res.status(400).json({ message: 'Provide password.' });
      return;
    }
    if (!email.includes("babson.edu")) {
      res.status(400).json({ message: 'Must be a @babson.edu address'});
      return;
    }
    if (password.length <= 7){
        res.status(400).json({ message: 'Please make your password at least 7 digits'})
        return;
    }


  
    const salt     = bcrypt.genSaltSync(10);
    const hashPass = bcrypt.hashSync(password, salt);
  

      User.findById(req.params.id)
      .then( (foundUser) => {
        foundUser.name = name;
        foundUser.phoneNum = phoneNum;
        foundUser.password = hashPass;
        if(foundUser.resume === ""){
          foundUser.resume = thePic;
        } else if(foundUser.profilePic === ""){
          foundUser.profilePic = thePic;
        }


        foundUser.save()
        .then( updUser => {
          console.log("MUUUUUFFFFASAAAAAAAAAAAAAA!")
          res.status(200).json(updUser)
        } )
        .catch( err => res.json(err))
      } )
      .catch( err => res.json(err))
  
      
});

authRoutes.post('/apply', (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const name = req.body.name;
  const gradDate = req.body.gradDate;
  const phoneNum = req.body.phoneNum;
  const role = req.body.role;
  const resume = req.body.resume;
  const profilePic = req.body.profilePic;


  if (!email || !password) {
    res.status(400).json({ message: 'Provide email and password' });
    return;
  }
  if (!email.includes("babson.edu")) {
    res.status(400).json({ message: 'Must be a @babson.edu address'});
    return;
  }
  if (!email.prototype.includes) {
    email.prototype.includes = function(search, start) {
      '@babson.edu'}
    res.status(400).json({ message: 'Must be a @babson.edu address'});
    return;
  }

  if (password.length < 7){
      res.status(400).json({ message: 'Please make your password at least 7 digits'})
      return;
  }

  User.findOne({ email }, '_id', (err, foundUser) => {
    if (foundUser) {
      res.status(400).json({ message: 'The email already exists' });
      return;
    }

    const salt     = bcrypt.genSaltSync(10);
    const hashPass = bcrypt.hashSync(password, salt);

    const theUser = new User({
      email: email,
      password: hashPass,
      name: name,
      gradDate: gradDate,
      phoneNum: phoneNum,
      role: 'applicant',
      resume: resume,
      profilePic: profilePic
    });

    theUser.save((err) => {
      if (err) {
        res.status(400).json({ message: 'Something went wrong' });
        return;
      }

      req.login(theUser, (err) => {
        if (err) {
          res.status(500).json({ message: 'Something went wrong' });
          return;
        }

        res.status(200).json(req.user);
        
      });
    });
  });
});


authRoutes.post('/login', (req, res, next) => {
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

  
  authRoutes.post('/logout', (req, res, next) => {
    req.logout();
    res.status(200).json({ message: 'Success' });
  });

  
  authRoutes.get('/loggedin', (req, res, next) => {
    if (req.isAuthenticated()) {
      res.status(200).json(req.user);
      return;
    }
  
    res.status(403).json({ message: 'Unauthorized' });
  });

  









module.exports = authRoutes;