const studentAssignment = require('./studentAssignmentModel')


function studentAssignmentController(req,res){
    console.log(req.body)
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

    if(!data.classRollNo)
    validation.push('Class roll no')

    if(!data.assignmentNo)
    validation.push('Assignment no')

    if(validation.length>0){
        res.json({
            success:false,
            status:422,
            message:validation.join(',') + ' is/are required'
        })
    }
    else{

        studentAssignment.findOne({classRollNo:data.classRollNo}).then(findAssignment=>{
            if(!!findAssignment){
                res.json({
                    success:false,
                    status:400,
                    message:'Assignment already uploaded'
                })
            }else{
                let dataObj = new  studentAssignment()
                dataObj.departmentId = data.departmentId
                dataObj.courseId = data.courseId
                dataObj.semesterId = data.semesterId
                dataObj.subjectId = data.subjectId
                dataObj.classRollNo = data.classRollNo
                dataObj.assignmentNo = data.assignmentNo
                
                if(req.file)
                dataObj.studentAssignment = '/studentAssignment/'+req.file.filename
        
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
    studentAssignment.find(req.body)
    .populate('departmentId')
    .populate('courseId')
    .populate('semesterId')
    .populate('subjectId')
    .then(resData1=>{
        res.json({
            success:true,
            status:200,
            message:'Data loaded',
            data:resData1
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
        studentAssignment.findOne({_id:data._id})
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





function studentAssignmentUpdate(req,res){
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
        studentAssignment.findOne({_id:data._id}).then(result1=>{
            if(!result1){
                res.json({
                    success:false,
                    status:404,
                    message:'Not found'
                })
            }else{

                if(data.file){
                    result1.file = data.file
                }
                result1.save().then(saveData=>{
                    res.json({
                        success:true,
                        status:200,
                        message:'Assignment updated successfully',
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


function studentAssignmentDelete (req,res){
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
        studentAssignment.findOne({_id:data._id}).then(result2=>{
            if(!result2){
                res.json({
                    success:false,
                    status:404,
                    message:'Not found'
                })
            }else{
                result2.deleteOne({_id:data._id}).then(result3=>{
                    res.json({
                        success:true,
                        status:200,
                        message:'Assignment delete successfully',
                        data:result3
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
    studentAssignmentController,
    getAll,
    getSingle,
    studentAssignmentUpdate,
    studentAssignmentDelete
}