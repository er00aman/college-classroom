const mongoose = require('mongoose')
const subjectSchema = mongoose.Schema({
    departmentId: {type:mongoose.Schema.Types.ObjectId,ref:'department',default:null},
    courseId: {type:mongoose.Schema.Types.ObjectId,ref:'course',default:null},
    semesterId: {type:mongoose.Schema.Types.ObjectId,ref:'semester',default:null},
    subjectName : {type:String,default:null},
    userType: {type:Number,default:1},
    status: {type:Boolean,default:true},
    createdAt: {type:Date,default:Date.now()}
})
module.exports = new mongoose.model('subject',subjectSchema)