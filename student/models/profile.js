const mongoose = require('mongoose');
const Package = require('../models/packages');


//Student Bio & Session
var studentSchema = mongoose.Schema({
    fname : {type:String},
    lname : {type:String},
    email : {type:String},
    password : {type:String},
    country : String,
    state : String,
    city : String,
    street : String,
    pincode : String,
    phone : {type:String},
    profile_pic : {type:String},  
    gender : String,
    time:String,
    method:String,
    program:String,
    participants:String,
    timeSlot:String,
    timeSlot1:String,
    bookPackage : {type: mongoose.Schema.Types.ObjectId, ref:'Package' }
})


var student = mongoose.model('students',studentSchema);

module.exports = student;