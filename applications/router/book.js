const express= require('express');
const bookService = require('../../domain/service/bookService')
var auth = require('../../config/auth')
const checkUser = require('../../config/midCheckUser')
const checkHost = require('../../config/midCheckHost')

const router = express.Router();

router.post('/user',auth.required,async (req,res)=>{
    try{
        const result = await bookService.saveNewBook(req.body)
        res.status(200).json(result)
    }catch(error){
        res.status(400).json({
            message:error.message
        })
    }
})

router.post('/host/list-book',async (req,res)=>{
    try{
        // if(req.payload==="host"){
        const {idHost} = req.body;
        const result = await bookService.getBookByIdHost(idHost)
        res.status(200).json(result)
        // }else{
        //     throw new Error("you are not host")
        // }
    }catch(error){
        res.status(400).json({
            message:error.message
        })
    }
})


router.post('/user/list-book',auth.required,async (req,res)=>{
    try{
        const {idUser} = req.body;
        const result = await bookService.getBookByIdUser(idUser)
        res.status(200).json(result)
    }catch(error){
        res.status(400).json({
            message:error.message
        })
    }
})

router.get('/room/:idRoom' ,async (req,res)=>{
    try{
        const {idRoom}= req.params;
        const result = await bookService.getBookIdRoom(idRoom)
        res.status(200).json(result)
    }catch(error){
        res.status(400).json({
            message:error.message
        })
    }
})


module.exports =router