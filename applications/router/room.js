const express = require('express')
const roomService = require('../../domain/service/roomService');
var multer = require('multer')
var uuidv4 = require('uuid/v4')
var getTime = require('../../config/getTime')
var auth = require('../../config/auth')


const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "static/images/room")
    },
    filename: (req, file, callback) => {
        callback(null, uuidv4() + file.originalname)
    }
})

const upload = multer({ storage: storage })

var router = express.Router();

//search
// get theo search

// router.get("/stored/:cookie",(req,res)=>{
//     console.log(req.params)
//     res.send({check:true})
// })

router.get("/search", async (req,res)=>{
    try{
    const q = req.query
    const result = await roomService.search(q)
    res.status(200).json(result)
    }catch(error){
        res.status(400).json({
            message:error.message
        })
    }
})


//post get room
router.get('/', async (req, res) => {
    const rooms = await roomService.getRoom();
    const listRoom = rooms;
    res.status(200).json(listRoom)
})

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const room = await roomService.getOneRoom(id);
    res.status(200).json(room)
})

router.get('/host/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const rooms = await roomService.getRoomHost(id);
        res.status(200).json(rooms)
    } catch (error) {
        res.status(400).json({
            message: 'không có phòng'
        })
    }
})

router.post('/', async (req, res) => {
    // const {idHost,name,address,price,maxPeople,present,ultilities,calendar} = req.body;
    // const image = req.body.imageURL.length>5 == null ? ['/static/images/room/default.png' * 5] : 
    // console.log(image)
    try {
        const room = await roomService.saveNewRoom(req.body);
        res.status(200).json({
            message: "post room is done"
        })
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
})

//get cmt
router.get('/cmt/:idRoom',  async (req, res) => {
    try{
    const { idRoom } = req.params;
    const listCmt = await roomService.getComment(idRoom);
    res.status(200).json(listCmt)
    }catch(error){
        res.status(400).json({
            message:error.message
        })
    }
})

router.post('/cmt/:idRoom',auth.required , async (req, res) => {
    try {
        const { idRoom } = req.params;
        const { idUser, content, rate } = req.body;
        const date = Date.now();
        const newPost = await roomService.postComment(idRoom, idUser, rate, content, date);
        res.status(200).json({
            message:"post cmt is done"
        })
    } catch (error) {
        res.status(400).json({
            message: error.message,
        })
    }
})



//rate
router.get('/rate/:idRoom', async (req, res) => {
    const { idRoom } = req.params;
    const rate = await roomService.getRate(idRoom);
    res.status(200).json({ rate })
})



module.exports = router

