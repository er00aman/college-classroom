const mongoose = require('mongoose')
const teacherSchema = mongoose.Schema({
    departmentId: {type:mongoose.Schema.Types.ObjectId,ref:'department',default:null},
    courseId: {type:mongoose.Schema.Types.ObjectId,ref:'course',default:null},
    semesterId: {type:mongoose.Schema.Types.ObjectId,ref:'semester',default:null},
    subjectId: {type:mongoose.Schema.Types.ObjectId,ref:'subject',default:null},
    file: {type:String,default:'No file'},
    assignmentName: {type:String,default:'No Assignment'},
    assignmentNumber: {type:Number,default:''},
    userType: {type:Number,default:1},
    status: {type:Boolean,default:true},
    createdAt: {type:Date,default:Date.now()}
})
module.exports = new mongoose.model('teacherAssignment',teacherSchema)