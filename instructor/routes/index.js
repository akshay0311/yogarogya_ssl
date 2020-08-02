const express = require('express');
const router = express.Router();
const multer = require("multer");
var fs = require('fs');
var passport = require('passport');
var path = require('path');
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

// Load User model
const User = require('../models/User');
var initializePassport = require('../../config/passport');
initializePassport(passport);



// GET Welcome Page
router.get('/', (req, res) => res.render('welcome'));


//  GET Dashboard  Route
router.get('/dashboard',checkAuthenticated, (req, res) =>{
  var user = req.user;
  u_name = req.user.email.split("@")[0];
  console.log(user.qual5.q);
  res.render('dashboard', {
    u_name : u_name,
    name: user.name,
    email : user.email,
    bio : user.bio,
    phone:user.phone,
    p_i : user.p_img_path,
    p : user.pr_img_path,
    address:user.address,
    qual1 : user.qual1,
    qual2 : user.qual2,
    qual3 : user.qual3,
    qual4 : user.qual4,
    qual5 : user.qual5,
    qual6 : user.qual6,
    qual7 : user.qual7,
    qual8 : user.qual8
  })
});


// GET PICTURES ROUTE
router.post('/dashboard1',upload.array('pics',10),(req,res)=>{
  if (req.files!=undefined){
    u_name = req.user.email.split("@")[0];
    User.findOne({ email: req.body.email }).then(user => {
      for (var i=0; i<req.files.length;i+=1){
        user.p_img_path.push(req.files[i].filename);
      }
      user.save()
      .then(usr=>res.render('dashboard', {
        u_name:u_name,
        name: user.name,
        email : user.email,
        bio : user.bio,
        phone:user.phone,
        p_i : user.p_img_path,
        p : user.pr_img_path,
        address:user.address,
        qual1 : user.qual1,
        qual2 : user.qual2,
        qual3 : user.qual3,
        qual4 : user.qual4,
        qual5 : user.qual5,
        qual6 : user.qual6,
        qual7 : user.qual7,
        qual8 : user.qual8,
      }))
      .catch(err=>console.log(err))  
  })
}
});


/*------------Uploading Profile Pic route--------*/
router.post("/dashboard/upload1",upload.single("profile_pic"),(req,res)=>{
  u_name = req.user.email.split("@")[0];
  if (req.file!=undefined){
    User.findOne({ email: req.body.email }).then(user => {
      user.pr_img_path = req.file.filename;
      user.save()
      .then(usr=>res.render('dashboard', {
        u_name : u_name,
        name: user.name,
        email : user.email,
        bio : user.bio,
        phone:user.phone,
        p_i : user.p_img_path,
        p : user.pr_img_path,
        address:user.address,
        qual1 : user.qual1,
        qual2 : user.qual2,
        qual3 : user.qual3,
        qual4 : user.qual4,
        qual5 : user.qual5,
        qual6 : user.qual6,
        qual7 : user.qual7,
        qual8 : user.qual8
      }))
      .catch(err=>console.log(err))  
  })
  .catch(err=>console.log(err));
}
});


/*-------Uploading certificate route-----------*/
router.post("/dashboard/upload2",upload.single("certificate"),(req,res)=>{

  const {h1,h2,h3,h4,h5,h6,h7,h8} = req.body;
  
    User.findOne({ email: req.body.email }).then(user => {
      u_name = req.user.email.split("@")[0];
      if (req.file){  
      if (h1) user.qual1.c_img_path = req.file.filename;
      if (h2) user.qual2.c_img_path = req.file.filename;
      if (h3) user.qual3.c_img_path = req.file.filename;
      if (h4) user.qual4.c_img_path = req.file.filename;
      if (h5) user.qual5.c_img_path = req.file.filename;
      if (h6) user.qual6.c_img_path = req.file.filename;
      if (h7) user.qual7.c_img_path = req.file.filename;
      if (h8) user.qual8.c_img_path = req.file.filename;
      user.save()
      .then(usr=>res.render('dashboard', {
        u_name : u_name,
        name: user.name,
        email : user.email,
        bio : user.bio,
        phone:user.phone,
        p_i : user.p_img_path,
        p : user.pr_img_path,
        address:user.address,
        qual1 : user.qual1,
        qual2 : user.qual2,
        qual3 : user.qual3,
        qual4 : user.qual4,
        qual5 : user.qual5,
        qual6 : user.qual6,
        qual7 : user.qual7,
        qual8 : user.qual8
      }))
      .catch(err=>console.log(err))  
}
else{res.redirect("/dashboard")}
})
  .catch(err=>console.log(err));
});




/*-------Deleting uploads-----------*/
router.post("/dashboard/delete",(req,res)=>{
    var {d1,d2,d3,d4,d5,d6,d7,d8,pp} = req.body;
      
     var pth0 = path.join(path.dirname(require.main.filename),"/uploads/"+pp);
     var pth1 = path.join(path.dirname(require.main.filename),"/uploads/"+d1);
     var pth2 = path.join(path.dirname(require.main.filename),"/uploads/"+d2);
     var pth3 = path.join(path.dirname(require.main.filename),"/uploads/"+d3);
     var pth4 = path.join(path.dirname(require.main.filename),"/uploads/"+d4);
     var pth5 = path.join(path.dirname(require.main.filename),"/uploads/"+d5);
     var pth6 = path.join(path.dirname(require.main.filename),"/uploads/"+d6);
     var pth7 = path.join(path.dirname(require.main.filename),"/uploads/"+d7);
     var pth8 = path.join(path.dirname(require.main.filename),"/uploads/"+d8);
     if (pp) {fs.unlink(pth0,(err)=>{if (err) res.redirect("/dashboard"); else  res.redirect("/dashboard");});}
     if (d1) {fs.unlink(pth1,(err)=>{if (err) res.redirect("/dashboard"); else  res.redirect("/dashboard");});}
     if (d2) {fs.unlink(pth2,(err)=>{if (err) res.redirect("/dashboard"); else  res.redirect("/dashboard");});}
     if (d3) {fs.unlink(pth3,(err)=>{if (err) res.redirect("/dashboard"); else  res.redirect("/dashboard");});}
     if (d4) {fs.unlink(pth4,(err)=>{if (err) res.redirect("/dashboard"); else  res.redirect("/dashboard");});}
     if (d5) {fs.unlink(pth5,(err)=>{if (err) res.redirect("/dashboard"); else  res.redirect("/dashboard");});}
     if (d6) {fs.unlink(pth6,(err)=>{if (err) res.redirect("/dashboard"); else  res.redirect("/dashboard");});}
     if (d7) {fs.unlink(pth7,(err)=>{if (err) res.redirect("/dashboard"); else  res.redirect("/dashboard");});}
     if (d8) {fs.unlink(pth8,(err)=>{if (err) res.redirect("/dashboard"); else  res.redirect("/dashboard");});}
})

router.get("/terms",(req,res)=>{
  res.render("terms")
})


//check authenticated
function checkAuthenticated(req,res,next){
  if (req.isAuthenticated())
      return next();
  else res.redirect('/users/login')    
}





module.exports = router;
