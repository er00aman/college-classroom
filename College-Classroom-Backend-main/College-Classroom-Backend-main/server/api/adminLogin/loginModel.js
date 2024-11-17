const mongoose = require('mongoose')

const loginModel = mongoose.Schema({
    email:{type:String, default:null},
    password:{type:String, default:null},
    status:{type:Boolean, default:true},
    userType: {type:Number, default:1},
    createdAt:{type:Date, default:Date.now}
})

module.exports = new mongoose.model('adminlogin',loginModel)