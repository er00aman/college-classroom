// const { blockCourse } = require('../course/courseController')
const semester = require('./semesterModel')

semesterController=(req,res)=>{
    let data = req.body
    var validation = []

    if(!data.departmentId)
    validation.push('Department Id')

    if(!data.courseId)
    validation.push('Course Id')

    if(!data.semester)
    validation.push('Semester')


    if (validation.length >0){
        res.json({
            status: 422,
            success: false,
            message: validation.join(',')+" is Required"
        })
    }else{
        semester.findOne({semester:data.semester}).then(obj=>{
            if(!!obj){
                res.json({
                    success:false,
                    status:500,
                    message:'Semester already added'
                })
            }else{
                let dataObj = new semester()
                dataObj.departmentId = data.departmentId
                dataObj.courseId = data.courseId
                dataObj.semester = data.semester

                dataObj.save().then(result=>{
                    res.json({
                        success:true,
                        status:200,
                        message:"semester added successfully",
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

semesterUpdate = (req,res)=>{
    let data = req.body

    if(!data._id){
        res.json({
            success:false,
            status:422,
            message:'Id is required'
        })
    }
    else{
        semester.findOne({_id:data._id}).then(findOneData=>{
            if(!findOneData){
                res.json({
                    success:false,
                    status:404,
                    message:'Not found !'
                })
            }else{
                if(data.departmentId){
                    findOneData.departmentId = data.departmentId
                }
                if(data.courseId){
                    findOneData.courseId = data.courseId
                }
                if(data.semester){
                    findOneData.semester = data.semester
                }

                findOneData.save().then(updateData=>{
                    res.json({
                        success:true,
                        status:200,
                        message:'Semester update successfully',
                        data:updateData
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

getAll=(req,res)=>{
   semester.find(req.body)
    .populate('departmentId')
    .populate('courseId')
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




filter= (req,res)=>{
    let data = req.body
    var validation = []
    
    if(!data.semester)
    validation.push('Semester')


    if(validation.length >0){
        res.json({
            status: 422,
            success: false,
            message: validation.join(',')+" is Required"
        })
    }else{
        semester.findOne({semester:data.semester})
        .populate('departmentId')
        .populate('courseId')
        .then(result=>{
            if(!result){
                res.json({
                    success:false,
                    status:404,
                    message:'Not found!'
                })
            }else{
                res.json({
                    success:true,
                    status:200,
                    message:'Data loaded successfully',
                    data:result
                })
            }
        }).catch(err=>{
            res.json({
                success:false,
                status:500,
                message:'error' + err
            })
        })
    }
}



getSingle=(req,res)=>{
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
        semester.findOne({_id:data._id})
        .populate('departmentId')
        .populate('courseId')
        .then(result=>{
            if(!result){
                res.json({
                    success:false,
                    status:404,
                    message:'Not found'
                })
            }else{
                res.json({
                    success:true,
                    status:200,
                    message:'Data loaded',
                    data :result
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

semesterBlock = (req,res)=>{
    let data = req.body
    validation = []

    if(!data._id)
    validation.push('_id')

    if(validation.length>0){
        res.json({
            success:false,
            status:422,
            message:validation + ' is/are required'
        })
    }else{
        semester.findOne({_id:data._id}).then(blockFindData=>{
            if(!blockFindData){
                res.json({
                    success:false,
                    status:404,
                    message:'Not found!'
                })
            }else{
                blockFindData.status = data.status
                blockFindData.save().then(semesterBlockSave=>{
                    res.json({
                        success:true,
                        status:200,
                        message:'Semester block successfully',
                        data:semesterBlockSave
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


module.exports ={ 
    semesterController,
    getAll,
    getSingle,
    semesterUpdate,
    filter,
    semesterBlock
}