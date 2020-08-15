const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');

// Load Package model
const Package = require('../models/packages');

// select your categories
router.get('/',(req,res,next)=>{
    res.render('book_package')    
})


// post route for pricing
router.post('/pricing',(req,res,next)=>{
    const {program,method,hours,participants} = req.body;
    var single = [],couple = [],group = [];
    if (method == 'online'){
            Package.find({mode:'online'})
            .then(package=>{ 
                for (var i=0; i<package.length;i+=1){
                    // single
                    if (package[i].participants == 'single'){
                        single.push({
                            price : package[i].price,
                            sessions : package[i].sessions,
                            validity : package[i].validity 
                        })
                    }
                    // couple
                    if (package[i].participants == 'couple'){
                        couple.push({
                            price : package[i].price,
                            sessions : package[i].sessions,
                            validity : package[i].validity 
                        })
                    }
                    // groupe
                    if (package[i].participants == 'group'){
                        group.push({
                            price : package[i].price,
                            sessions : package[i].sessions,
                            validity : package[i].validity 
                        })
                    }      
                }
                res.render('pricing',{single,couple,group});
            })
            .catch(err=>console.log(err))
    }
})


// post api
router.post('/api',(req,res,next)=>{
    var {hours,validity,mode,participants,sessions,price} = req.body;
    var package = new Package({hours,validity,mode,participants,sessions,price})
    package.save()
    .then(result=>res.status(201).json({result}))
    .catch(err=>console.log(err))        
})
router.get('/api',(req,res,next)=>{
    Package.find({})
    .then(result=>res.status(201).json(result))
    .catch(err=>console.log(err))
})
// delete api for deleting package
router.delete('/api',(req,res,next)=>{
    Package.deleteMany({},function(result){
        console.log("deleted");
    })
})

module.exports = router;