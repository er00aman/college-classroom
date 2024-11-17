const student = require('./studentModel')

const bcrypt = require('bcrypt')
const salt = 10

const jwt = require('jsonwebtoken')
private = "k2@05"

studentLogin = (req,res)=>{

    formData =  req.body
    validation = [ ]
    
    if(!formData.universityRollNo)
    validation.push('University roll no')

    if(!formData.password)
    validation.push('Password')

    if(validation.length>0){
        res.json({
            success:false,
            status:403,
            message:validation + ' is/are required'
        })
    }else{
        student.findOne({universityRollNo:formData.universityRollNo})
        .then(resData=>{
            if(!resData){
                res.json({
                    success:false,
                    status:404,
                    message:'User not found'
                })
            }else{
                bcrypt.compare(formData.password,resData.password,()=>{
                    if(!resData){
                        res.json({
                            success:false,
                            status:422,
                            message:'Invalid password'
                        })
                    }else{
                        let tokenData = {
                            _id:resData._id,
                            studentName:resData.studentName,
                            studentEmail:resData.studentEmail,
                            userType : resData.userType,
                            status:resData.status
                        }

                        let token = jwt.sign(tokenData,private)

                        res.json({
                            success:true,
                            status:200,
                            message:"Login successfully",
                            data:resData,
                            token:token
                        })
                    }
                })
            }
        }).catch(err=>{
            res.json({
                success:false,
                status:404,
                message:'Not found'
            })
        })
    }
 
}



function studentController(req,res){
    let data = req.body
    validation = []

    
    if(!data.departmentId)
    validation.push('Department Id')

    if(!data.courseId)
    validation.push('Course Id')

    // if(!data.teacherId)
    // validation.push('Teacher Id')

    if(!data.studentName)
    validation.push('student name')

    if(!data.studentEmail)
    validation.push('Student email')

    if(!data.password)
    validation.push('Password')

    if(!data.universityRollNo) 
    validation.push('University roll no')

    if(!data.cRollNo)
    validation.push('Class roll no')

    if(!data.semesterId)
    validation.push('Semester Id')

    if(validation.length>0){
        res.json({
            success:false,
            status:422,
            message:validation.join(',') + ' is/are required'
        })
    }
    else{

        student.findOne({cRollNo:data.cRollNo}).then(obj=>{
            if(!!obj){
                res.json({
                    success:false,
                    status:500,
                    message:'student already added'
                })
            }else{ 
                let dataObj = new student()
                
                dataObj.departmentId = data.departmentId
                dataObj.courseId = data.courseId
                // dataObj.teacherId = data.teacherId
                dataObj.studentName = data.studentName
                dataObj.studentEmail = data.studentEmail
                dataObj.universityRollNo = data.universityRollNo
                dataObj.cRollNo = data.cRollNo
                dataObj.semesterId = data.semesterId
                dataObj.password = bcrypt.hashSync('req.body.password',salt)

                dataObj.save().then(result=>{
                    res.json({
                        success:true,
                        status:200,
                        message:"student added successfully",
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


function getAll(req,res){
    student.find(req.body)
    .populate('departmentId')
    .populate('courseId')
    // .populate('teacherId')
    .populate('semesterId')
    .then(result=>{
        res.json({
            success:true,
            status:200,
            message:'Data loaded',
            data:result
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
        student.findOne({_id:data._id})
        .populate('departmentId')
        .populate('courseId')
        // .populate('teacherId')
        .populate('semesterId')

        .then(result1=>{
            if(!result1){
                res.json({
                    success:false,
                    status:403,
                    message:'Not found'
                })
            }else{
                res.json({
                    success:true,
                    status:200,
                    message:'Data loaded',
                    data:result1
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



function studentUpdate(req,res){
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
        student.findOne({_id:data._id})
        .then(result=>{
            if(!result){
                res.json({
                    success:false,
                    status:404,
                    message:'Not found'
                })
            }else{

                if(data.studentName){
                    result.studentName = data.studentName
                }
                if(data.studentEmail){
                    result.studentEmail = data.studentEmail
                }
                if(data.universityRoll){
                    result.universityRollNo = data.universityRollNo
                }
                if(data.cRollNo){
                    result.cRollNo = data.cRollNo
                }
                if(data.semester){
                    result.semester = data.semester
                }
                result.save().then(saveData=>{
                    res.json({
                        success:true,
                        status:200,
                        message:'Student updated successfully',
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




function studentDelete (req,res){
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
        student.findOne({_id:data._id}).then(result=>{
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
                        message:'Student delete successfully',
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


studentBlock = (req,res)=>{
    let data = req.body
    validation = []

    if(!data._id)
    validation.push('_Id')

    if(validation.length>0){
        res.json({
            success:false,
            status:422,
            message:validation + ' is/are required'
        })
    }else{
        student.findOne({_id:data._id}).then(findBlockData=>{
            if(!findBlockData){
                res.json({
                    success:false,
                    status:404,
                    message:'Not found!'
                })
            }else{
                findBlockData.status = data.status
                findBlockData.save().then(blockSaveData=>{
                    res.json({
                        success:true,
                        status:200,
                        message:'Student block successfully',
                        data:blockSaveData
                    })
                }).catch(err=>{
                    res.json({
                        success:false,
                        status:500,
                        message:'Error'+err
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

module.exports = {
    studentLogin,
    studentController,
    getAll,
    getSingle,
    studentUpdate,
    studentDelete,
    studentBlock
}