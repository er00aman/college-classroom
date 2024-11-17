const mongoose = require('mongoose')
const courseSchema = mongoose.Schema({
    departmentId: {type:mongoose.Schema.Types.ObjectId, ref:'department', default:null},
    courseName: {type:String, default:null},
    status: {type:Boolean, default:true},
    createdAt: {type:Date, default:Date.now()}
})
module.exports = new mongoose.model('course',courseSchema)