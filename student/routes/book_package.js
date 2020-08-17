const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');

// Load Package model
const Package = require('../models/packages');
// Load customer profile model
const Student = require('../models/profile');

async function findInPackage(f){
    if (f == 1) var z = await Package.find({mode:'online'})
    if (f == 2) var z = await Package.find({hours:'peak'})
    if (f == 3) var z = await Package.find({mode:'non-peak'})
    return z;
}

/*------------------------There are total 8 different types of Packages---------------------*/
/*---------------------RENDER PRICING PAGE -----------------------------------*/
function renderPricingPage(req,res,mode,p,hours){
    var single = [], couple= [], group = [],result;
    if (mode === 'online')  result = findInPackage(1);
    if (hours === 'peak')  result = findInPackage(2);
    if (hours === 'non-peak')  result = findInPackage(3); 
    result.then(package=>{
        for (var i =0 ; i<package.length; i+=1){
            if (package[i].participants == 'single'){
                single.push({price: package[i].price,
                            validity: package[i].validity,
                            sessions: package[i].sessions,   
                            mode:mode   
                             })    
                }
            else if (package[i].participants == 'couple'){
                couple.push({price: package[i].price,
                    validity: package[i].validity,
                    sessions: package[i].sessions ,
                    mode:mode  
                     })
            }  
            else {
                group.push({price: package[i].price,
                    validity: package[i].validity,
                    sessions: package[i].sessions, 
                    mode:mode   
                     })
                }// else closed 
            }     
            res.render('package_pricing',{
                single,
                couple,
                group,
                p
            })//render closed     
        })//then closed
    .catch(err=>console.log(err))
   
} // function closed


/*-----------------------GET BOOK PACKAGES PAGE--------------------*/
router.get('/',(req,res,next)=>{
    res.render('book_package',{timeSlots1:['5 am','6 am','7 am','8 am','9 am',
    '5 pm','6 pm','7 pm','8 pm','9 pm'],timeSlots2:['10 am','11 am','12 am','1 pm','2 pm','3 pm','4 pm','10 pm']
})  
})

/*-------------------------------RENDER PRICING PAGE AFTER POST REQUEST-----------------------*/ 
router.post('/pricing',(req,res,next)=>{
   const {method,participants,hours} = req.body;   
   renderPricingPage(req,res,method,participants,hours);
})

 
/*------------------------------RENDER PAYMENT PAGE POST REQUEST ON PRICING PAGE----------------------*/
router.post('/pay',(req,res,next)=>{
    const {sessions,mode,participants} = req.body;  
    res.render('payment',{
        sessions,
        mode,
        participants
    })
})

/*-----------------------------------SAVING USERS INFO AND HIS PACKAGES-------------------------*/

router.post('/donePayment',(req,res,next)=>{
    var {sessions,mode,participants,email,password} = req.body;
     Package.find({sessions,mode,participants})
     .then(result=>{
            var newUser = new Student({
                email,
                password,
                bookPackage : result[0]._id
            })
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                  newUser.password = hash;
                  newUser.save().then(user => {console.log(user); 
                    res.redirect('/');
                    }) 
            }) // closing bcrypt hash
            })// closing bcrypt genSalt
     })        
     .catch(err=>console.log(err))
})



module.exports = router;