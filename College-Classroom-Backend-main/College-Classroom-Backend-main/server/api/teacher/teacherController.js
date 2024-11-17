const teacher = require('../teacher/teacherModel')
const bcrypt = require('bcrypt')
salt = 10
const jwt = require('jsonwebtoken')
private = "k2@05"

// <<< === teacher add code  start ===  >>>

function teacherController(req,res){
    let data = req.body
    validation = []

    
    if(!data.departmentId)
    validation.push('Department Id')

    if(!data.courseId)
    validation.push('Course Id')

    if(!data.teacherDesignation)
    validation.push('Teacher designation')

    // if(!data.dataOfJoin)
    // validation.push('Teacher date of join')

    if(!data.workExperience)
    validation.push('Teacher work experience')

    if(!data.teacherRegisterEmail)
    validation.push('Teacher email')
4
    if(!data.password)
    validation.push('Password')

    if(!data.teacherName)
    validation.push('Teacher')


    if(validation.length>0){
        res.json({
            success:false,
            status:422,
            message:validation.join(',') + ' is/are required'
        })
    }
    else{
        teacher.findOne({teacherRegisterEmail:data.teacherRegisterEmail}).then(obj=>{
            if(!!obj){
                res.json({
                    success:false,
                    status:500,
                    message:'teacher already added'
                })
            }else{ 
                let dataObj = new teacher()
                
                dataObj.departmentId = data.departmentId
                dataObj.courseId = data.courseId
                dataObj.teacherDesignation = data.teacherDesignation
                // dataObj.dataOfJoin = data.dataOfJoin
                dataObj.workExperience = data.workExperience
                dataObj.teacherRegisterEmail = data.teacherRegisterEmail
                dataObj.password = bcrypt.hashSync('data.password',salt)
                dataObj.teacherName = data.teacherName

                dataObj.save().then(result=>{
                    res.json({
                        success:true,
                        status:200,
                        message:"teacher added successfully",
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
// <<< === teacher add code  end ===  >>>

// <<< ==== teacher login start===>>>
loginTeacher = (req,res)=>{
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
        teacher.findOne({teacherRegisterEmail:data.teacherRegisterEmail}).then(findEmail=>{
            if(!findEmail){
                res.json({
                    success:false,
                    status:404,
                    message:'User not found!'
                })
            }else{
                bcrypt.compare(findEmail.teacherRegisterEmail,data.teacherRegisterEmail,()=>{
                    if(!findEmail){
                        res.json({
                            success:false,
                            status:400,
                            message:'Invalid user'
                        })
                    }

                    let tokenData = {
                        _id:findEmail._id,
                        name:findEmail.teacherName,
                        email:findEmail.teacherRegisterEmail
                    }

                    let token = jwt.sign(tokenData,private)

                    res.json({
                        success:true,
                        status:200,
                        message:'User login successfully',
                        data:findEmail,
                        token:token
                    })
                })
            }
        }).catch(err=>{
            res.json({
                success:false,
                status:400,
                message:'Error'+err
            })
        })
    }
}
// <<< ==== teacher login end===>>>


// <<< === getAll code start ===  >>>

function getAll(req,res){
    teacher.find(req.body)
    .populate('departmentId')
    .populate('courseId')
    .then(result0=>{
        res.json({
            success:true,
            status:200,
            data:result0
        })
    }).catch(err=>{
        res.json({
            success:false,
            status:404,
            message:'error' + err
        })
    })
}

// <<< === getAll code  end  ===  >>>


// <<< === teacher getSingle  start === >>

function getSingle(req,res){
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
        teacher.findOne({_id:data._id})
        .populate('departmentId')
        .populate('courseId')
        .then(result1=>{
            if(!result1){
                res.json({
                    success:false,
                    status:404,
                    message:'Not found'
                })
            }else{
                res.json({
                    success:true,
                    status:200,
                    message:result1
                })
            }
        }).catch(err=>{
            res.json({
                success:false,
                status:422,
                message:'error' + err
            })
        })
    }
}
// <<< === teacher getSingle  end === >>


// <<< === teacher update code start === >>>
function teacherUpdate(req,res){
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
        teacher.findOne({_id:data._id})
        .then(result2=>{
            if(!result2){
                res.json({
                    success:false,
                    status:404,
                    message:'Not found'
                })
            }else{

                if(data.teacherName){
                    result2.teacherName = data.teacherName
                }
                if(data.teacherRegisterEmail){
                    result2.teacherRegisterEmail = data.teacherRegisterEmail
                }
                if(data.teacherDesignation){
                    result2.teacherDesignation = data.teacherDesignation
                }
                // if(data.dataOfJoin){
                //     result2.dataOfJoin = data.dataOfJoin
                // }
                if(data.workExperience){
                    result2.workExperience = data.workExperience
                }
                result2.save().then(saveData=>{
                    res.json({
                        success:true,
                        status:200,
                        message:'teacher updated successfully',
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

// <<< === teacher update code end === >>>



// <<< === teacher delete  end === >>
function teacherDelete (req,res){
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
        teacher.findOne({_id:data._id}).then(result3=>{
            if(!result3){
                res.json({
                    success:false,
                    status:404,
                    message:'Not found'
                })
            }else{
                result3.deleteOne({_id:data._id}).then(result4=>{
                    res.json({
                        success:true,
                        status:200,
                        message:'teacher delete successfully',
                        data:result4
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

const teacherBlock = (req,res)=>{
    let data = req.body
    validation = []

    if(!data._id)
    validation.push('Id')

    if(!data.status)
    validation.push('Status')

    if(validation.length>0){
        res.json({
            success:false,
            status:422,
            message:validation.join(',')+' is/are required'
        })
    }else{
        teacher.findOne({_id:data._id}).then(findData2=>{
            if(!findData2){
                res.json({
                    success:false,
                    status:404,
                    message:'Not found!'
                })
            }else{
                findData2.status = data.status
                findData2.save().then(saveObj=>{
                    res.json({
                        success:true,
                        status:200,
                        message:'Teacher blocked successfully',
                        data:saveObj
                    })
                }).catch(err=>{
                    res.json({
                        success:false,
                        status:500,
                        message:'Server error'+err
                    })
                })
            }
        }).catch(err=>{
            res.json({
                success:false,
                status:400,
                message:'Internal server error'+err
            })
        })
    }
}

// <<< === teacher delete  end === >>
module.exports = {
    teacherController,
    getAll,
    getSingle,
    teacherDelete,
    teacherBlock,
    teacherUpdate,
    loginTeacher
}