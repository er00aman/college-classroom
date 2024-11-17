const mongoose = require('mongoose')
const teacherSchema = mongoose.Schema({
    departmentId: {type:mongoose.Schema.Types.ObjectId,ref:'department',default:null},
    courseId: {type:mongoose.Schema.Types.ObjectId,ref:'course',default:null},
    teacherName: {type:String,default:null},
    teacherDesignation:{type:String,default:null},
    dataOfJoin:{type:Date,default:null},
    workExperience:{type:Number,default:null},
    teacherRegisterEmail: {type:String,default:null},
    password: {type:String,default:null},
    userType: {type:Number,default:2},
    status: {type:Boolean,default:true},
    createdAt: {type:Date,default:Date.now()}
})
module.exports = new mongoose.model('teacherRegister',teacherSchema)