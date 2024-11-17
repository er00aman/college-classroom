const mongoose = require('mongoose')
const departmentSchema = mongoose.Schema({
    name: {type:String,default:null},
    status: {type:Boolean,default:true},
    userType : {type:Number,default:2}, // 1-Admin , 2-Customer
    createdAt: {type:Date,default:Date.now()}
})
module.exports = new mongoose.model('department',departmentSchema)