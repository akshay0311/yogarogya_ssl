const mongoose = require('mongoose');



//Student Bio & Session
var studentSchema = mongoose.Schema({
    name : {type:String},
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
    partner:String,
    timeSlot:String,
    timeSlot1:String
})


var student = mongoose.model('students',studentSchema);

module.exports = student;