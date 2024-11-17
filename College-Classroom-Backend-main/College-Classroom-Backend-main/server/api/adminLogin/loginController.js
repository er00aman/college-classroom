const loginModel = require('./loginModel')
const bcrypt = require('bcrypt')
const salt = 10
const jwt = require('jsonwebtoken')
private = 'k2@05'



Login = (req,res)=>{

    formData =  req.body
    validation = [ ]
    
    if(!formData.email)
    validation.push('Email')

    if(!formData.password)
    validation.push('Password')

    if(validation.length>0){
        res.json({
            success:false,
            status:403,
            message:validation + ' is/are required'
        })
    }else{
        loginModel.findOne({email:formData.email})
        .then(resData=>{
            if(!resData){
                res.json({
                    success:false,
                    status:404,
                    message:'User not found'
                })
            }else{
                bcrypt.compare(formData.password,resData.password,(err,data)=>{
                    if(!resData){
                        res.json({
                            success:false,
                            status:422,
                            message:'Invalid password'
                        })
                    }else{
                        let tokenData = {
                            email:resData.email,
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




function AdminRegister(req,res){
    let data = req.body
    validation = []

    if(!data.email)
    validation.push('Email')

    if(!data.password)
    validation.push('Password')

    if(validation.length>0){
        res.json({
            success:false,
            status:422,
            message:validation.join(',') + ' is/are required'
        })
    }
    else{

        loginModel.findOne({email:data.email}).then(obj=>{
            if(!!obj){
                res.json({
                    success:false,
                    status:403,
                    message:'Admin already added'
                })
            }else{ 
                let dataObj = new loginModel()
                
                dataObj.email = data.email
                dataObj.password = bcrypt.hashSync('req.body.password',salt)

                dataObj.save().then(result=>{
                    res.json({
                        success:true,
                        status:200,
                        message:"Admin added successfully",
                        data:result
                    })
                }).catch(err=>{
                    res.json({
                        success:false,
                        status:400,
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


module.exports = {Login,AdminRegister}