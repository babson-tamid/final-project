const express = require('express');
const router  = express.Router();
const Newsletter    = require('../models/newsletter');
const cloudinary = require('cloudinary');
const uploadCloud = require('../config/cloudinary');



router.get('/newsletter', (req, res, next) => {
    Newsletter.find()
    .then((allTheNewsletters)=>{
        res.json(allTheNewsletters);
    })
    .catch((err)=>{
        res.json(err);
    })

});

router.post('/newsletter/create', uploadCloud.single('image'), (req, res, next)=>{
    console.log('body: ', req.body)
    Newsletter.create({
        creator: req.body.creator,
        title: req.body.title, 
        description: req.body.description,
        imgPath: req.file.url
    })
    .then((response)=>{
        res.json(response);
    })
    .catch((err)=>{
        res.json(err);
    })
})



router.get('/newsletter/:id', (req, res, next) => {
    const id = req.params.id;
    Newsletter.findById(id)
    .then((oneNewsletter)=>{    
        res.json(oneNewsletter);
    })
    .catch((err)=>{
       res.json(err); 
    })
});


router.post('/newsletter/:id/update', uploadCloud.single('image'), (req, res, next)=>{
    console.log('BODY:', req.body)

    Newsletter.findByIdAndUpdate(req.params.id, {
        creator: req.body.creator,
        title: req.body.title, 
        description: req.body.description,
        imgPath: req.body.imgPath
        
    })
    .then((oneNewsletter)=>{
        res.json(oneNewsletter)
    })
    .catch((err)=>{
        res.json(err);
    })  
})



router.post ('/newsletter', uploadCloud.single('image'),(req, res, next) => {
    console.log("hererererer: ", req.file.url)
    console.log(req.user)
    
    Newsletter.findById(req.user._id)
    .then( (foundNewsletter) => {
        
        foundNewsletter.imgPath = req.file.url;
        
        
        foundNewsletter.save((err) => {
            if (err) {
                res.status(400).json({ message: 'Something went wrong' });
                return;
              }
              
          });
          
      });
      
      
  });


router.post('/newsletter/:id/delete', (req, res, next)=>{
    Newsletter.findByIdAndRemove(req.params.id)
    .then((oneNewsletter)=>{
        res.json(oneNewsletter);
    })
    .catch((err)=>{
        res.json(err);
    })
})






module.exports = router;