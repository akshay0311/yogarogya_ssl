const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const multer = require("multer");
// Load Student model
const Student = require('../models/profile');

//Storage Config
var storage = multer.diskStorage({ 
  destination: (req, file, cb) => { 
      cb(null, './uploads') 
  }, 
  filename: (req, file, cb) => { 
      cb(null, file.fieldname + '-' + Date.now()+".png"); 
  }, 
  limits: { fileSize:  5000000  }
}); 

var upload = multer({ storage: storage });


// Authentication
var initializePassport = require('../../config/passport');
const { route } = require('../../instructor/routes');
initializePassport(passport);

// Register Page
router.get('/register', (req, res) => res.render('register1'));

// Login Page
router.get('/login', (req, res) => res.render('login1'));

// Post route for  Login
router.post('/login', (req, res, next) => {
    passport.authenticate('Student', {
      successRedirect: '/student/dashboard',
      failureRedirect: '/student/login',
      failureFlash: true
    })(req, res, next);
  });

// Get route for  Logout
router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/');
});  

// Get route for  Logout
router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/');
});

/*--------------------post route -------*/
//8: Post route for Registration
router.post('/register', (req, res) => {
  const { name, email, phone,password, password2,country,state,pincode,city,street} = req.body;
  let errors = [];

  if (!name || !email || !password || !password2){
    name,
    email,
    password,
    errors.push({ msg: 'Please enter all fields' });
  }

  if (password != password2) {
    errors.push({ msg: 'Passwords do not match' });
  }

  if (password.length < 6) {
    errors.push({ msg: 'Password must be at least 6 characters' });
  }

  if (errors.length > 0) {
    res.render('register1', {
      errors,
      name,
      email,
      password,
      phone
    });
  } else {
    Student.findOne({ email: email }).then(user => {
      if (user) {
        errors.push({ msg: 'Email already exists' });
        res.render('register1', {
          errors,
          name,
          email,
          password,
          password2,
          phone,
          country,
          city,
          state,
          pincode,
          street
        });
      } else {
        //creating new user
        const newUser = new Student({
          name,
          email,
          password,
          phone,
          country,
          city,
          state,
          pincode,
          street
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => {
                console.log(user);
                req.flash(
                  'success_msg',
                  'You are now registered and can log in'
                );
                res.redirect('/student/login');
              })
              .catch(err => console.log(err));
          });
        });
      }
    });
  }
});
var addresses = [];
// get dashboard
router.get('/dashboard',checkAuthenticated,(req,res)=>{
  var user = req.user;
  ct = [{name : 'yo', progress:'90%'},{name : 'to', progress:'50%'}]
  res.render('dashboard1',
  {
    name:user.name,
    email:user.email,
    country:user.country,
    city: user.city,
    state: user.state,
    street : user.street,
    pincode: user.pincode,
    phone : user.phone,
    pp:user.profile_pic,
    ct : ct,
    addresses: addresses
  }
  );
})

// post route for storing  customers coordinates
router.post('/geoloc',(req,res)=>{
  var user = req.user;
  Student.findOne({ email: req.body.email }).then(usr => {
    addresses.push(req.body.address);
    res.render("dashboard1",{
      name:user.name,
      email:user.email,
      country:user.country,
      city: user.city,
      state: user.state,
      street : user.street,
      pincode: user.pincode,
      phone : user.phone,
      pp:user.profile_pic,
      addresses: addresses
    });
  })
  .catch(err=>console.log(err))
})  



// uploading profile pic
router.post("/dashboard",upload.single("profile_pic"),(req,res)=>{
  if (req.file!=undefined){
    Student.findOne({ email: req.body.email }).then(user => {
      user.profile_pic = req.file.filename;
      user.save()
      .then(usr=>res.render('dashboard1',
      {
          name:user.name,
          email:user.email,
          country:user.country,
          city: user.city,
          state: user.state,
          street : user.street,
          pincode: user.pincode,
          phone : user.phone,
          pp:user.profile_pic,
          addresses:addresses
      }
      ))
      .catch(err=>console.log(err))  
  })
  .catch(err=>console.log(err));
}
else res.redirect('/student/dashboard');
});





/*------------------ Authentication---------------*/ 
//check authenticated
function checkAuthenticated(req,res,next){
  if (req.isAuthenticated())
      return next();
  else res.redirect('/student/login')    
}


module.exports = router;
