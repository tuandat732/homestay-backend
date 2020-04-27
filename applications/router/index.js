var express = require("express")
var router= express.Router()
var authUserRouter = require("./authUser")
var authHostRouter = require('./authHost')
var authRegister = require("./authRegister")
var roomRouter = require('./room')
var bookRouter = require('./book')
// var userRouter = require('./user')


router.use('/auth',authRegister)
router.use("/authUser",authUserRouter)
router.use("/authHost",authHostRouter)
router.use('/room',roomRouter)
router.use('/book',bookRouter)
// router.use('/user',userRouter)
module.exports = router
