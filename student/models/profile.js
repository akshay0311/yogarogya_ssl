const mongoose = require('mongoose');
var coursesSchema = mongoose.Schema({
    name : String,
    progress : Number
})


//Student Bio & Session
var studentSchema = mongoose.Schema({
    name : {type:String,required:true},
    email : {type:String,required:true},
    password : {type:String,required:true},
    address : {type:String},
    phone : {type:String},
    profile_pic : {type:String},
    courses : [coursesSchema]  
})


var student = mongoose.model('students',studentSchema);

module.exports = student;