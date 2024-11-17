// const { get } = require('mongoose')
const subject = require('./subjectModel')

function subjectController(req,res){
    let data = req.body
    validation = []

    
    if(!data.departmentId)
    validation.push('Department Id')

    if(!data.courseId)
    validation.push('Course Id')

    if(!data.semesterId)
    validation.push('Semester Id')

    if(!data.subjectName)
    validation.push('Subject name')

    if(validation.length>0){
        res.json({
            success:false,
            status:422,
            message:validation.join(',') + ' is/are required'
        })
    }
    else{
        subject.findOne({subjectName:data.subjectName}).then(obj=>{
            if(!!obj){
                res.json({
                    success:false,
                    status:500,
                    message:'Subject already added'
                })
            }else{ 
                let dataObj = new subject()
                
                dataObj.departmentId = data.departmentId
                dataObj.courseId = data.courseId
                dataObj.semesterId = data.semesterId
                dataObj.subjectName = data.subjectName

                dataObj.save().then(result=>{
                    res.json({
                        success:true,
                        status:200,
                        message:"Subject added successfully",
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
    subject.find(req.body)
    .populate('departmentId')
    .populate('courseId')
    .populate('semesterId')
    .then(result1=>{
        res.json({
            success:true,
            status:200,
            data:result1
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
        subject.findOne({_id:data._id})
        .populate('departmentId')
        .populate('courseId')
        .populate('semesterId')
        .then(result2=>{
            if(!result2){
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
                    data:result2
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




function subjectUpdate(req,res){
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
        subject.findOne({_id:data._id})
        .then(result3=>{
            if(!result3){
                res.json({
                    success:false,
                    status:404,
                    message:'Not found'
                })
            }else{

                if(data.subjectName){
                    result3.subjectName = data.subjectName
                }
                result3.save().then(saveData=>{
                    res.json({
                        success:true,
                        status:200,
                        message:'subject updated successfully',
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



function subjectDelete (req,res){
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
        subject.findOne({_id:data._id}).then(result4=>{
            if(!result4){
                res.json({
                    success:false,
                    status:404,
                    message:'Not found'
                })
            }else{
                result4.deleteOne({_id:data._id}).then(result5=>{
                    res.json({
                        success:true,
                        status:200,
                        message:'subject delete successfully',
                        data:result5
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


subjectBlock = (req,res)=>{
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
        subject.findOne({_id:data._id}).then(findBlockData=>{
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
                        message:'Subject block successfully',
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
    subjectController,
    getAll,
    getSingle,
    subjectUpdate,
    subjectDelete,
    subjectBlock
}