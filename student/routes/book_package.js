const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');

// Load Student model
const Student = require('../models/profile');



// select your categories
//router.get('/',(req,res,next)=>{
    res.render('book_package')    
//})
// post route for pricing
/*router.post('/pricing',(req,res,next)=>{
    const {program,method,hours,participants} = req.body;
    if (method == 'online'){
        res.render('pricing',{

        });    
    }
    elif (hours == 'peak'){

    }
    else
})

module.exports = router;
*/