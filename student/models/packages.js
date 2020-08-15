// DB schema for packages
const mongoose = require('mongoose');

const packageSchema = new mongoose.Schema({
    mode : String,
    hours : {type:String,default:null},
    validity : Number,
    price : Number,
    sessions : Number,
    participants : String
})


var package = mongoose.model('Package',packageSchema);

module.exports = package;