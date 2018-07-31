const express = require('express');
const router  = express.Router();
const Newsletter    = require('../models/newsletter');

router.get('/newsletter', (req, res, next) => {
    Newsletter.find()
    .then((allTheNewsletters)=>{
        res.json(allTheNewsletters);
    })
    .catch((err)=>{
        res.json(err);
    })

});

router.post('/newsletter/create', (req, res, next)=>{
    Newsletter.create({
        creator: req.body.creator,
        title: req.body.title, 
        description: req.body.description,
        imgPath: req.body.imgPath

    
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


router.post('/newsletter/:id/update', (req, res, next)=>{
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