const mongoose = require('../../infastruture/database.js')
const {Schema} = require('mongoose')
const crypto = require("crypto")
const jwt = require('jsonwebtoken')

const hostSchema = new Schema({
    name:String,
    email:String,
    phone:String,
    avatar:String,
    rememberMe:Boolean,
    stayListId:[String],
    hash:String,
    salt:String,
})

hostSchema.methods.validPassword= function(password){
    const hash = crypto.pbkdf2Sync(password,this.salt,10000,512,"sha512").toString('hex')
    return this.hash === hash
}

hostSchema.methods.setPassword=function(password){
    this.salt =crypto.randomBytes(16).toString('hex')
    this.hash = crypto.pbkdf2Sync(password,this.salt,10000,512,"sha512").toString('hex')
    
}

hostSchema.methods.generateJWT = function(){
    const now = new Date();
    const expirationDate = new Date();
    expirationDate.setDate(now.getDate()+1)
    return jwt.sign({
        id:this._id,
        avatar:this.avatar,
        name:this.name,
        email: this.email,
        phone:this.phone,
        type:"host",
        exp: parseInt(expirationDate.getTime()/1000 ,10)
    }, process.env.JWT_SECRET) // bất cứ text nào
}

const Host = mongoose.model("Host",hostSchema)

module.exports = Host