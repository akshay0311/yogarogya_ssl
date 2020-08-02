const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');

// Load Student model
const Student = require('../models/profile');

// Authentication
var initializePassport = require('../../config/passport');
initializePassport(passport);

// select your categories
router.get('/',(req,res,next)=>{
      res.render('packages')    
})

module.exports = router;