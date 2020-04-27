require('dotenv').config()
const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
var morgan = require('morgan')
const path = require('path')

var router = require('./applications/router/index.js')

var app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(cors())

app.use(morgan("dev"))

require("./config/passport")

app.use(router);
app.use('/static',express.static(path.join(__dirname,'static')))



const PORT = process.env.PORT || 5000
app.listen(PORT, ()=>console.log(`App is running at ${PORT}`))