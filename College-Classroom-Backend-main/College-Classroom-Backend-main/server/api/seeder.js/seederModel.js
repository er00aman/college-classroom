const mongoose = require('mongoose')


const adminSchema = mongoose.Schema({
    email: {type:String,default:null},
    password: {type:String,default:null},
    userType: {type:Number,default:1},
    status: {type:Boolean,default:true},
    createdAt: {type:Date,default:Date.now()}
})
module.exports = new mongoose.model('seeder',adminSchema)