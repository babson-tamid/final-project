const express    = require('express');
const authRoutes = express.Router();
const bcrypt     = require('bcryptjs');
const session    = require('express-session');
const passport   = require('passport');

const User       = require('../models/user');




authRoutes.post('/signup', (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;
    const gradDate = req.body.gradDate;
    const phoneNum = req.body.phoneNum;
    const admin = req.body.admin;
    const resume = req.body.resume;
    const profilePic = req.body.profilePic;

  
    if (!email || !password) {
      res.status(400).json({ message: 'Provide email and password' });
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
        admin: admin,
        resume: resume,
        profilePic: resume
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