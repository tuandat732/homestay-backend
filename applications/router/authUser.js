const express = require('express')
const authUserService = require('../../domain/service/authUserService')
var passport = require('passport')
var auth = require('../../config/auth')
const authHostService = require('../../domain/service/authHostService')

var router = express.Router();

router.post('/login', auth.optional, async (req, res, next) => {
    passport.authenticate("userLocal", { session: false }, (err, user, next) => {
        if (err) {
            return next(err) //truyền dc cho middeware tiếp theo or có thể return res.json() 
        }
        else if (user) {
            return res.json({
                id: user.id,
                avatar: user.avatar,
                name: user.name,
                email: user.email,
                phone:user.phone,
                type: "user",
                token: user.generateJWT()
            })
        }
    })(req, res, next);
})

router.get('/me', auth.required, async (req, res) => {
    try {
        // console.log(req.payload)
        if (req.payload.type === "user") {
            const user = await authUserService.find(req.payload.email);
            res.status(200).json({
                email: user.email,
                id: user.id,
                avatar: user.avatar,
                name: user.name,
                phone:user.phone,
                type: "user",
                token: user.generateJWT()
            })
        } else {
            throw new Error("token not for user")
        }
    } catch (error) {
        res.status(401).json({
            message: error.message
        })
    }
})

router.get('/logout', auth.required, async (req, res) => {
    res.status(200).json({
        message: "log out user done"
    })
})

module.exports = router;