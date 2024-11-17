const department = require('./departmentModel')


function departmentController(req,res){
    let data = req.body
    var validationError = []

    if (!data.name)
        validationError.push('name')

    if (validationError.length >0){
        res.json({
            status: 422,
            success: false,
            message: validationError.join(',')+" is Required"
        })
    }else{
        department.findOne({name:data.name}).then(obj=>{
            if(!!obj){
                res.json({
                    success:false,
                    status:500,
                    message:'Department already added'
                })
            }else{
                let dataObj = new department()

                dataObj.name = data.name

                dataObj.save().then(result=>{
                    res.json({
                        success:true,
                        status:200,
                        message:"Department added successfully",
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


// <<< === departmentGetAll === >>>

const getAll = (req,res)=>{
    department.find(req.body).then(result=>{
        res.json({
            status:200,
            success:true,
            message:'Data loaded',
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



// <<< === departmentGetSingle === >>>
const getSingle = (req,res)=>{
  let data = req.body
  validation = []

  if(!data._id)
  validation.push('Id')

  if(validation.length>0){
    res.json({
        success:false,
        status:400,
        message:validation + ' is/are required'
    })
  }else{
    department.findOne({_id:data}).then(data=>{
        if(!data){
            res.json({
                success:false,
                status:500,
                message:'Not found'
            })
        }else{
            res.json({
                success:true,
                status:200,
                message:"get data",
                data:data
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


// <<< === update department === >>>

const updateDepartment = (req,res) => {

    var validationError = ""

    if (req.body._id == "")
        validationError += "ID is required \n"
    if (req.body.name == "")
        validationError += "Name is required \n"
    
    if (!!validationError) {
        res.json({
            status: 422,
            success: false,
            message: validationError
        })
    }
    else {
        department.findOne({ _id: req.body._id })
            .then(data => {
                if(data != null)
                {
                    data.name = req.body.name
                    data.save()
                    res.json({
                        status: 200,
                        success: true,
                        message: "department Updated",
                        data:data
                    })
                }
                else{
                    res.json({
                        status: 404,
                        success: false,
                        message: "department Not Found"
                    })
                }
            })
            .catch(err => {
                res.json({
                    status: 500,
                    success: false,
                    message: err
                })
            })
    }
}


// <<< === delete department === >>>
const deleteDepartment = (req, res) => {

    var validationError = ""

    if (req.body._id == "")
        validationError += "ID is required \n"

    if (!!validationError) {
        res.json({
            status: 422,
            success: false,
            message: validationError
        })
    }
    else {
       department.findOne({ _id: req.body._id })
            .then(data=>{
                
                if(data != null)
                {
                    //permanent delete
                   department.deleteOne({_id:req.body._id}).then(()=>{
                        res.json({
                            status: 200,
                            success: true,
                            message: "Data Deleted"
                        })
                    })
                }
                else{
                    res.json({
                        status: 404,
                        success: false,
                        message: "Data not found"
                    })
                }

            })
            .catch(err => {
                res.json({
                    status: 500,
                    success: false,
                    message: err
                })
            })
    }
}

// <<< === temporary delete === >>>

const departmentBlock = (req, res) => {

    var validationError = ""

    if (req.body._id == "")
        validationError += "ID is required \n"
    
    if (!!validationError) {
        res.json({
            status: 422,
            success: false,
            message: validationError
        })
    }
    else {
      department.findOne({ _id: req.body._id })
            .then(data => {
                if(!!data)
                {
                    //update code
                    data.status = req.body.status
                    data.save().then(()=>{
                        res.json({
                            status: 200,
                            success: true,
                            message: "Department block successfully",
                            data:data
                        })
                    }).catch(err=>{
                        res.json({
                            status: 404,
                            success: false,
                            message: err
                        })
                    })
                }
                else{
                    res.json({
                        status: 404,
                        success: false,
                        message: "User Not Found"
                    })
                }
            })
            .catch(err => {
                res.json({
                    status: 500,
                    success: false,
                    message: err
                })
            })
    }
}

module.exports = {
    departmentController,
    getAll,
    getSingle,
    updateDepartment,
    deleteDepartment,
    departmentBlock
}