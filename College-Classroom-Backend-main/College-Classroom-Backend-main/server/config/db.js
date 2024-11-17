const mongoose = require('mongoose')
mongoose.connect("mongodb://127.0.0.1:27017/Daviet_classroom").then(()=>{
    console.log('Database connectivity is successfully established')
}).catch((err)=>{
    console.log(err)
})