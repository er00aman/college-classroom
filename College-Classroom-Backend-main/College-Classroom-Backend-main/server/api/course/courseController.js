const course = require('./courseModel')

function courseController(req,res){
    let data = req.body
    validation = []

    if(!data.departmentId)
    validation.push('Department id')

    if(!data.courseName)
    validation.push('Course name')

    if(validation.length>0){
        res.json({
            success:false,
            status:422,
            message:validation.join(',') + ' is/are required'
        })
    }
    else{
        course.findOne({courseName:data.courseName})
        .then(obj=>{
            if(!!obj){
                res.json({
                    success:false,
                    status:500,
                    message:'Course already added'
                })
            }else{ 
                let dataObj = new course()
                
                dataObj.departmentId = data.departmentId
                dataObj.courseName = data.courseName

                dataObj.save().then(saveData=>{
                    res.json({
                        success:true,
                        status:200,
                        message:"Course added successfully",
                        data:saveData
                    })
                }).catch(err=>{
                    res.json({
                        success:false,
                        status:404,
                        message:'error' + err
                    })
                })
            }
        }).catch(error=>{
            res.json({
                success:false,
                status:400,
                message:'error' + error
            })
        })
    }

}

function getAll(req,res){
    course.find(req.body)
    .populate('departmentId')
    .then(data=>{
        res.json({
            success:true,
            status:200,
            message:'Data loaded',
            data:data
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
            status:422,
            message:validation + ' is/are required'
        })
    }else{
        course.findOne({_id:data._id})
        .populate('departmentId')
        .then(result=>{
            if(!result){
                res.json({
                    success:false,
                    status:404,
                    message:'Not found'
                })
            }
            else{
                res.json({
                    success:true,
                    status:200,
                    message:'Data loaded',
                    data: result
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

function courseUpdate(req,res){
    let data = req.body

    if(!data._id){
        res.json({
            success:false,
            status:422,
            message:"ID is required"
        })
    }
    else{
        course.findOne({_id:data._id})
        .then(result=>{
            if(!result){
                res.json({
                    success:false,
                    status:404,
                    message:'Not found'
                })
            }
            else{
                if(!!data.departmentId){
                    result.departmentId = data.departmentId
                }
                if(!!data.courseName){
                    result.courseName = data.courseName
                }
                result.save().then(updatedData=>{
                    res.json({
                        success:true,
                        status:200,
                        message:'Course updated successfully',
                        data:updatedData
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
                status:400,
                message:'error' + err
            })
        })
    }
}


function courseDelete (req,res){
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
        course.findOne({_id:data._id}).then(result=>{
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
                        message:'Course delete successfully',
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

blockCourse = (req,res)=>{
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
        course.findOne({_id:data._id}).then(findBlockObj=>{
            if(!findBlockObj){
                res.json({
                    success:false,
                    status:404,
                    message:'Not found !'
                })
            }else{
                findBlockObj.status = data.status
                findBlockObj.save().then(blockRes=>{
                    res.json({
                        success:true,
                        status:200,
                        message:'Course block successfully',
                        data:blockRes
                    })
                }).catch(err=>{
                    res.json({
                        success:false,
                        status:400,
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
    courseController,
    getAll,
    getSingle,
    courseUpdate,
    courseDelete,
    blockCourse
}