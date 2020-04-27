const Host = require('../model/host')
const User = require('../model/user')
const validate = require("../../config/validate")


const authHostService = {
    signUp: async (email,pass,confirmPass,name,avatar,phone)=>{
        let listError =[]
        if(!validate.validateEmail(email)) listError.push('Email is incorrect')
        if(!validate.validatePass(pass)) listError.push('pass length more than 8 character and have number')
        if(pass!==confirmPass) listError.push('pass and confirm pass is not correct')
        let checkHost = await Host.findOne({email});
        if(checkHost) listError.push("email had register")
        if(checkHost===null && listError.length===0){
            const newHost =new Host ({email,phone,name,avatar,rememberMe:false});
            const newUser = new User ({email,phone,name,avatar,rememberMe:false});
            newHost.setPassword(pass)
            newUser.setPassword(pass)
            const result = await newHost.save();
            const result2 = await newUser.save();
            return newHost;
        } else{
            throw new Error(listError.join(','))
        }
    },

    signIn: async (email,pass)=>{
        const checkHost = await Host.findOne({email})
        if(checkHost){
            if(checkHost.validPassword(pass)){
                return checkHost
            }
        } 
        throw new Error('email or password is incorect')
    },

    singOut: async (email)=>{
        const checkHost = await Host.find({email})
        if(checkHost) return true
    },

    find: async (email)=>{
        const host  = await Host.findOne({email})
        return host
    }
}

module.exports = authHostService