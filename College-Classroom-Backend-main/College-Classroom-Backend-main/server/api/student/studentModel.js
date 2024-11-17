const mongoose = require('mongoose')
const studentSchema = mongoose.Schema({
    departmentId: {type:mongoose.Schema.Types.ObjectId,ref:'department',default:null},
    courseId: {type:mongoose.Schema.Types.ObjectId,ref:'course',default:null},
    // teacherId: {type:mongoose.Schema.Types.ObjectId,ref:'teacher',default:null},
    studentName: {type:String,default:null},
    studentEmail: {type:String,default:null},
    password: {type:String,default:null},
    universityRollNo: {type:Number,default:null},
    cRollNo: {type:Number,default:null},
    semesterId: {type:mongoose.Schema.Types.ObjectId,ref:'semester',default:null},
    status: {type:Boolean,default:true},
    userType : {type:Number,default:3}, 
    createdAt: {type:Date,default:Date.now()}
})
module.exports = new mongoose.model('student',studentSchema)