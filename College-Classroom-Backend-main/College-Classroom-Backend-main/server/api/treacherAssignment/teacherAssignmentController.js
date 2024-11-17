const teacherAssignment = require('./teacherAssignmentModel')

function teacherAssignmentController(req,res){
    console.log(req.file)
    let data = req.body
    validation = []

    
    if(!data.departmentId)
    validation.push('Department Id')

    if(!data.courseId)
    validation.push('Course Id')

    if(!data.semesterId)
    validation.push('Semester Id')

    if(!data.subjectId)
    validation.push('Subject Id')

    if(!data.assignmentName)
    validation.push('Assignment name')

    // if(!data.file)
    // validation.push('File')

    if(!data.assignmentNumber)
    validation.push('Assignment number')

    if(validation.length>0){
        res.json({
            success:false,
            status:422,
            message:validation.join(',') + ' is/are required'
        })
    }
    else{

        // console.log(req.body)
        teacherAssignment.findOne({assignmentName:data.assignmentName}).then(findObj=>{
            if(!!findObj){
                res.json({
                    success:false,
                    status:400,
                    message:'File already uploaded'
                })
            }else{
                let dataObj = new  teacherAssignment()
                dataObj.departmentId = data.departmentId
                dataObj.courseId = data.courseId
                dataObj.semesterId = data.semesterId
                dataObj.subjectId = data.subjectId
                dataObj.assignmentName = data.assignmentName
                dataObj.assignmentNumber = data.assignmentNumber
                
                if(req.file)
                dataObj.file = '/teacherAssignment/' + req.file.filename

                dataObj.save()
                .then(resData=>{
                    res.json({
                        success:true,
                        status:200,
                        message:'Assignment upload successfully',
                        data:resData
                    })
                }).catch(err=>{
                    res.json({
                        success:false,
                        status:500,
                        message:'error'+err
                    })
                })
            }
        })
    }
}





function getAll(req,res){
    teacherAssignment.find(req.body)
    .populate('departmentId')
    .populate('courseId')
    .populate('semesterId')
    .populate('subjectId')
    .then(resData=>{
        res.json({
            success:true,
            status:200,
            message:'Data loaded',
            data:resData
        })
    }).catch(err=>{
        res.json({
            success:false,
            status:404,
            message:'error'+err
        })
    })
}





function getSingle(req,res){
    data = req.body
    validation  = []

    if(!data._id)
    validation.push('Id')

    if(validation.length>0){
        res.json({
            success:false,
            status:403,
            message:validation.join(',') + ' is/are required'
        })
    }else{
        teacherAssignment.findOne({_id:data._id})
        .populate('departmentId')
        .populate('courseId')
        .populate('semesterId')
        .populate('subjectId')
        .then(result=>{
            if(!!result){
                res.json({
                    success:false,
                    status:200,
                    message:'Data loaded',
                    data:result
                })
            }else{
                res.json({
                    success:false,
                    status:404,
                    message:'Not found'
                })
            }
        }).catch(err=>{
            res.json({
                success:false,
                status:500,
                message:'error'+err
            })
        })
    }
}



function teacherAssignmentUpdate(req,res){
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
        teacherAssignment.findOne({_id:data._id})
        .then(result1=>{
            if(!result1){
                res.json({
                    success:false,
                    status:404,
                    message:'Not found'
                })
            }else{

                if(data.assignmentName){
                    result1.assignmentName = data.assignmentName
                }

                if(data.assignmentNumber){
                    result1.assignmentNumber = data.assignmentNumber
                }

                if(data.file){
                    result1.file = '/teacherAssignment/'+ req.file.filename
                }

                result1.save().then(saveData0=>{
                    res.json({
                        success:true,
                        status:200,
                        message:'Assignment updated successfully',
                        data:saveData0
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



function teacherAssignmentDelete (req,res){
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
        teacherAssignment.findOne({_id:data._id}).then(result3=>{
            if(!result3){
                res.json({
                    success:false,
                    status:404,
                    message:'Not found'
                })
            }else{
                result3.deleteOne({_id:data._id}).then(result2=>{
                    res.json({
                        success:true,
                        status:200,
                        message:'Assignment delete successfully',
                        data:result2
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
    teacherAssignmentController,
    getAll,
    getSingle,
    teacherAssignmentUpdate,
    teacherAssignmentDelete
}