const express    = require('express');
const userRoutes = express.Router();
const User       = require('../models/user');



userRoutes.get('/aboutpage', (req, res, next) => {
    User.find()
    .then((allTheUsers)=>{
        res.json(allTheUsers);
    })
    .catch((err)=>{
        res.json(err);
    })

});

userRoutes.get('/user/:id', (req, res, next) => {
    const id = req.params.id;
    User.findById(id)
    .then((oneUser)=>{    
        res.json(oneUser);
    })
    .catch((err)=>{
       res.json(err); 
    })
});




  




module.exports = userRoutes;