const mongoose = require('mongoose')
const teacherSchema = mongoose.Schema({
    departmentId: {type:mongoose.Schema.Types.ObjectId,ref:'department',default:null},
    courseId: {type:mongoose.Schema.Types.ObjectId,ref:'course',default:null},
    teacherDesignation:{type:String,default:null},
    workExperience:{type:Number,default:null},
    teacherRegisterEmail: {type:String,default:null},
    password : {type:String, default:null},
    teacherName: {type:String,default:null},
    status: {type:Boolean,default:true},
    userType : {type:Number,default:2}, 
},{timestamps:true,versionKey:false})
module.exports = new mongoose.model('teacher',teacherSchema)