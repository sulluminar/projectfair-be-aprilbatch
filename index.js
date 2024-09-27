//const appMiddleware = require('./Middlewares/appMiddleware')
const router = require('./Router/router')
// 1) import dotenv module
require('dotenv').config()

// 2) import express module 
const express = require('express')

require('./DB/connections')

// 3) import cors module 
const cors = require('cors')

// 4) create server using express 
const pfServer = express()

// 5) inject cors into pfserver
pfServer.use(cors());

// 6) use middle ware to convert JSON data to js object 
pfServer.use(express.json())

// apply application middleware here
//pfServer.use(appMiddleware)

pfServer.use(router)
// pfserver should expose the uploads folder
pfServer.use('/uploads',express.static('./uploads'))
// 7) Provide PORT 
const PORT = 4000;

// 8) run the server 
pfServer.listen(PORT, ()=>{
    console.log(`pfServer is running in PORT ${PORT}`)
})

pfServer.get('/',(req,res)=>{
    res.send("server for Project Fair is running and waiting for Client requests !!!!")
})