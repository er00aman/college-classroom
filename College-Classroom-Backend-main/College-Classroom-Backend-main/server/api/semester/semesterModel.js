const mongoose = require('mongoose')
const semesterSchema = mongoose.Schema({
    departmentId: {type:mongoose.Schema.Types.ObjectId, ref:'department', default:null},
    courseId: {type:mongoose.Schema.Types.ObjectId, ref:'course', default:null},
    semester: {type:Number,default:null},
    status: {type:Boolean,default:true},
    userType : {type:Number,default:2}, 
    createdAt: {type:Date,default:Date.now()}
})
module.exports = new mongoose.model('semester',semesterSchema)