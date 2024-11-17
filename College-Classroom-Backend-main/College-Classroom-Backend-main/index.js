const express = require('express')
const app = express()
const port = 8000
var cors = require('cors')

app.use(cors())
// <<< === seeders === >>>
const seeder = require('./server/api/seeder.js/seederController')
seeder.seeder()


// <<< === middleware === >>>
app.use(express.json({limit:"50mb"}))
app.use(express.urlencoded({extended:false}))

app.use(express.static(__dirname+"/server/public/"))



// <<< === Database connectivity === >>>
const config = require("./server/config/db")



const routes = require('./server/routes/apiRouters')
app.use('/api',routes)


app.listen(port,()=>{
    console.log("Server is running at port - "+port)
})