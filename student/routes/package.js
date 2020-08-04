const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');

// Load Student model
const Student = require('../models/profile');

// Authentication
var initializePassport = require('../../config/passport');
const { route } = require('./profile');
initializePassport(passport);

// select your categories
router.get('/',(req,res,next)=>{
      res.render('trial_package')    
})
router.post('/geo',(req,res,next)=>{
      res.redirect('/package');
})
// posting trial 
router.post('/book_trial',(req,res,next)=>{
      /*--------------- Users Login Info------------------*/
      const {gender,partner,time,name,program,email,password,method,phone} = req.body;
      if (!gender||!partner||!time||!name||!program||!email||!password||!method ||!phone){
            res.render('trial_package',{error:"true"});
      }else{    
      const newUser = new Student({
            gender,
            partner,
            time,
            program,
            method,
            name,
            email,
            password,
            phone
      });
      bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if (err) throw err;
              newUser.password = hash;
              newUser
                .save()
                .then(user => { console.log(newUser);res.redirect('/student/dashboard');
            })
            .catch(err => console.log(err));
      })
      })
}           
})
module.exports = router;