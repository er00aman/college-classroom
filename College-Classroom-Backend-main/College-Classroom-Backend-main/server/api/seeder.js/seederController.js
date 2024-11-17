const seeders = require('../adminLogin/loginModel')

const bcrypt = require('bcrypt')
const salt = 10

const seeder = ()=>{
    seeders.findOne({email:"seeders@gmail.com"}).then((res)=>{
        if(!res){

            let seedersObj = new seeders()
            seedersObj.name = "Admin"
            seedersObj.email = "seeders@gmail.com"
            seedersObj.password = bcrypt.hashSync('seeders_3639',salt)
            seedersObj.save().then(()=>{
                console.log("Seeders registered")
            })
        }else{
            console.log('Seeders already exists')
        }
    })
}

module.exports = {
    seeder
}