const jwt = require('jsonwebtoken')
const private = "k2@05"


module.exports = (req,res,next)=>{
    let token = req.headers['authorization'];
    jwt.verify(token,private,(err,data)=>{
        if(!!data){
            req.decoded = data
            next()
        }else{
            res.json({
                success:false,
                status:403,
                message:'Unothorized'
            })
        }
    })
}