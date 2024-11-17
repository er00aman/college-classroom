const teacherRegister = require('./teacherRegisterModel')
const bcrypt = require('bcrypt')
const salt = 10;

const jwt = require('jsonwebtoken')
private = 'k2@05'

function teacherRegisterController(req,res){
    let data = req.body
    validation = []

    
    if(!data.departmentId)
    validation.push('Department Id')

    if(!data.courseId)
    validation.push('Course Id')

    if(!data.teacherName)
    validation.push('Teacher Register name')

    if(!data.teacherRegisterEmail)
    validation.push('TeacherRegister email')

    if(!data.password)
    validation.push('Password')

    if(!data.teacherDesignation)
    validation.push('Teacher Designation')

    if(!data.dataOfJoin)
    validation.push('Date of joining')

    if(!data.workExperience)
    validation.push('Work experience')

    if(validation.length>0){
        res.json({
            success:false,
            status:422,
            message:validation.join(',') + ' is/are required'
        })
    }
    else{
        teacherRegister.findOne({teacherRegisterEmail:data.teacherRegisterEmail}).then(obj=>{
            if(!!obj){
                res.json({
                    success:false,
                    status:500,
                    message:'teacherRegister already added'
                })
            }else{ 
                let dataObj = new teacherRegister()
                
                dataObj.departmentId = data.departmentId
                dataObj.courseId = data.courseId
                dataObj.teacherName = data.teacherName
                dataObj.teacherRegisterEmail = data.teacherRegisterEmail
                dataObj.password = bcrypt.hashSync(data.password,salt) 
                dataObj.teacherDesignation = data.teacherDesignation
                dataObj.dataOfJoin = data.dataOfJoin
                dataObj.workExperience = data.workExperience

                dataObj.save().then(result=>{
                    res.json({
                        success:true,
                        status:200,
                        message:"Teacher register successfully",
                        data:result
                    })
                }).catch(err=>{
                    res.json({
                        success:false,
                        status:500,
                        message:'error' + err
                    })
                })
            }
        }).catch(error=>{
            res.json({
                success:false,
                status:500,
                message:'error' + error
            })
        })
    }
}


teacherLogin = (req,res)=>{
    let data = req.body
    validation = []

    if(!data.teacherRegisterEmail)
    validation.push('Email')

    if(!data.password)
    validation.push('Password')

    if(validation.length>0){
        res.json({
            success:false,
            status:422,
            message:validation.join(',')+' is/are required'
        })
    }else{
        teacherRegister.findOne({teacherRegisterEmail:data.teacherRegisterEmail}).then(findTeacherData=>{
            if(!findTeacherData){
                res.json({
                    success:false,
                    status:404,
                    message:'Not found!'
                })
            }else{
                bcrypt.compare(data.password,findTeacherData.password,()=>{
                    if(!findTeacherData){
                        res.json({
                            success:false,
                            status:400,
                            message:'Invalid user'
                        })
                    }else{
                        let tokenData = {
                            teacherRegisterEmail : findTeacherData.teacherRegisterEmail,
                            status : findTeacherData.status,
                            userType : findTeacherData.userType
                        }
                        let token = jwt.sign(tokenData,private)

                        res.json({
                            success:true,
                            status:200,
                            message:'Login successfully',
                            data : findTeacherData,
                            token : token
                        })
                    }
                })
            }
        })
    }
}

function getAll(req,res){
    teacherRegister.find(req.body)
    .populate('departmentId')
    .populate('courseId')
    .then(result=>{
        res.json({
            success:true,
            status:200,
            message:result
        })
    }).catch(err=>{
        res.json({
            success:false,
            status:404,
            message:'error' + err
        })
    })
}



function getSingle(req,res){
    let data = req.body
    validation = []

    if(!data._id)
    validation.push('Id')

    if(validation.length>0){
        res.json({
            success:false,
            status:403,
            message:validation.join(',') + ' is/are required'
        })
    }else{
        teacherRegister.findOne({_id:data._id})
        .populate('departmentId')
        .populate('courseId')
        .then(result=>{
            if(!result){
                res.json({
                    success:false,
                    status:403,
                    message:'Not found'
                })
            }else{
                res.json({
                    success:true,
                    status:200,
                    message:result
                })
            }
        }).catch(err=>{
            res.json({
                success:false,
                status:404,
                message:'error'+err
            })
        })
    }
}




function teacherRegisterUpdate(req,res){
    let data = req.body
    validation = []

    if(!data._id)
    validation.push('Id')

    if(validation.length>0){
        res.json({
            success:false,
            status:422,
            message:validation.join(',') + ' is/are required'
        })
    }else{
        teacherRegister.findOne({_id:data._id})
        .then(result=>{
            if(!result){
                res.json({
                    success:false,
                    status:404,
                    message:'Not found'
                })
            }else{

                if(data.teacherName){
                    result.teacherName = data.teacherName
                }
                if(data.teacherRegisterEmail){
                    result.teacherRegisterEmail = data.teacherRegisterEmail
                }
                if(data.teacherDesignation){
                    result.teacherDesignation = data.teacherDesignation
                }
                if(data.dataOfJoin){
                    result.dataOfJoin = data.dataOfJoin
                }
                if(data.workExperience){
                    result.workExperience = data.workExperience
                }
                if(req.body.password)
                result.password = bcrypt.hashSync(data.password,salt)

                result.save().then(saveData=>{
                    res.json({
                        success:true,
                        status:200,
                        message:'Teacher register updated successfully',
                        data:saveData
                    })
                }).catch(err=>{
                    res.json({
                        success:false,
                        status:500,
                        message:'error' + err
                    })
                })
            }
        }).catch(err=>{
            res.json({
                success:false,
                status:404,
                message:'error' + err
            })
        })
    }
}



function teacherRegisterDelete (req,res){
    let data = req.body
    validation = []

    if(!data._id)
    validation.push('Id')

    if(validation.length>0){
        res.json({
            success:false,
            status:422,
            message:validation + ' is/are required'
        })
    }else{
        teacherRegister.findOne({_id:data._id}).then(result=>{
            if(!result){
                res.json({
                    success:false,
                    status:404,
                    message:'Not found'
                })
            }else{
                result.deleteOne({_id:data._id}).then(result=>{
                    res.json({
                        success:true,
                        status:200,
                        message:'teacherRegister delete successfully',
                        data:result
                    })
                }).catch(err=>{
                    res.json({
                        success:false,
                        status:500,
                        message:'error' + err
                    })
                })
            }
        }).catch(err=>{
            res.json({
                success:false,
                status:404,
                message:'error'+ err
            })
        })
    }
}


module.exports = {
    teacherRegisterController,
    getAll,
    getSingle,
    teacherRegisterUpdate,
    teacherRegisterDelete,
    teacherLogin
}