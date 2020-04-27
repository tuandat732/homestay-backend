const mongoose = require("../../infastruture/database")
const {Schema} = require('mongoose')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')

const UserSchema = new Schema({
    name:String,
    email:String,
    phone:String,
    avatar:String,
    rememberMe:Boolean,
    
    hash:String,
    salt:String,
})

UserSchema.methods.validPassword= function(password){
    const hash = crypto.pbkdf2Sync(password,this.salt,10000,512,"sha512").toString('hex')
    return this.hash === hash
}

UserSchema.methods.setPassword=function(password){
    this.salt =crypto.randomBytes(16).toString('hex')
    this.hash = crypto.pbkdf2Sync(password,this.salt,10000,512,"sha512").toString('hex')
}

UserSchema.methods.generateJWT = function(){
    const now = new Date();
    const expirationDate = new Date();
    expirationDate.setDate(now.getDate()+1)
    return jwt.sign({
        id:this._id,
        name:this.name,
        avatar:this.avatar,
        email: this.email,
        phone:this.phone,
        type:"user",
        exp: parseInt(expirationDate.getTime()/1000 ,10)
    }, process.env.JWT_SECRET) // bất cứ text nào
}

const User = mongoose.model("User",UserSchema)

module.exports = User