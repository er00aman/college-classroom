const teacherMaterial = require('./teacherUploadMaterialModel')


function teacherUploadController(req,res){

    // console.log(req.file)

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

    if(!data.materialName)
    validation.push('Material name')

    // if(!data.file)
    // validation.push('File')

    if(validation.length>0){
        res.json({
            success:false,
            status:422,
            message:validation.join(',') + ' is/are required'
        })
    }
    else{

        // console.log(req.file)

        teacherMaterial.findOne({materialName:data.materialName}).then(findObj=>{
            if(!!findObj){
                res.json({
                    success:false,
                    status:400,
                    message:'Material already uploaded'
                })
            }else{
                let dataObj = new  teacherMaterial()
                dataObj.departmentId = data.departmentId
                dataObj.courseId = data.courseId
                dataObj.semesterId = data.semesterId
                dataObj.subjectId = data.subjectId
                dataObj.materialName = data.materialName
                
                if(req.file)
                dataObj.material = "/teacherMaterial/"+req.file.filename

                dataObj.save()
                .then(resData=>{
                    res.json({
                        success:true,
                        status:200,
                        message:'Material upload successfully',
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






// <<< === getAll === >>>

function getAll(req,res){
    teacherMaterial.find(req.body)
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
        teacherMaterial.findOne({_id:data._id})
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



function teacherUploadUpdate(req,res){
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
        teacherMaterial.findOne({_id:data._id})
        .then(result1=>{
            if(!result){
                res.json({
                    success:false,
                    status:404,
                    message:'Not found'
                })
            }else{

                if(data.file){
                    result1.file = data.file
                }
                result1.save().then(saveData0=>{
                    res.json({
                        success:true,
                        status:200,
                        message:'Material updated successfully',
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


deleteMaterial = (req,res)=>{
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
        teacherMaterial.findOne({_id:data._id}).then(findObj2=>{
            if(!findObj2){
                res.json({
                    success:false,
                    status:404,
                    message:'Not found!'
                })
            }else{
                findObj2.deleteOne({_id:data._id}).then(deleteObj=>{
                    res.json({
                        success:true,
                        status:200,
                        message:'Material update successfully',
                        material:deleteObj
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
    teacherUploadController,
    getAll,
    getSingle,
    teacherUploadUpdate,
    deleteMaterial
}