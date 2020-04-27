const express = require('express')
const authHostService = require('../../domain/service/authHostService')
const auth = require('../../config/auth')
var passport = require('passport')


var router = express.Router();


router.post('/login', auth.optional, async (req, res, next) => {
    // const {email,pass} = req.body;
    // try{
    //     const host = await authHostService.signIn(email,pass);
    //     res.status(200).json(host)
    // } catch(error){
    //     res.status(400)
    //     res.json({
    //         message:error.message
    //     }) 
    // }
    passport.authenticate("hostLocal", { session: false }, (err, host, next) => {
        if (err) {
            return next(err) //truyền dc cho middeware tiếp theo or có thể return res.json() 
        }
        else if (host) {
            console.log(host)
            return res.json({
                id:host.id,
                avatar:host.avatar,
                email: host.email,
                name:host.name,
                phone:host.phone,
                type: "host",
                token: host.generateJWT()
            })
        }
    })(req, res, next);
})

router.get('/me', auth.required, async (req, res) => {
    try {
        // console.log(req.payload)
        if (req.payload.type === "host") {
            const host = await authHostService.find(req.payload.email);
            res.status(200).json({
                id:host.id,
                avatar:host.avatar,
                name:host.name,
                email: host.email,
                phone:host.phone,
                type: "host",
                token: host.generateJWT()
            })
        }else throw new Error('token not for host')
    } catch (error) {
        console.log(error)
        res.status(401).json({
            message: error.message
        })
    }
})


router.get('/logout',auth.required, (req, res) => {
    res.status(200).json({
        message:"log out host done"
    })
})

module.exports = router;