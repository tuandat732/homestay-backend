const User = require('../model/user.js')
const validate = require("../../config/validate")



const authUserService = {
    // signUp: async (email,pass,confirmPass,name,avatar,phone)=>{
    //     let listError =[]
    //     if(!validateEmail(email)) listError.push('Email is correct')
    //     if(!validatePass(pass)) listError.push('pass length more than 8 character and have number')
    //     if(pass!==confirmPass) listError.push('pass and confirm pass is not correct')
    //     let checkUser = await User.findOne({email});
    //     if(checkUser) listError.push("email had register")
    //     if(checkUser===null && listError.length === 0 ){
    //         const newUser = new User({email,name,avatar,phone})
    //         newUser.setPassword(pass)
    //         const result = await newUser.save()
    //         return newUser;
    //     } else{
    //         throw new Error(listError.join(','))
    //     }
    // },

    signIn: async (email,pass,rememberMe)=>{
        const checkUser = await User.findOne({email})
        if(checkUser){
            if(checkUser.validPassword(pass)){
                return checkUser
            }
        } else throw new Error('email or password is incorect')
    },

    singOut: async (email)=>{
        const checkUser = await User.find({email})
        if(checkUser) return true
    },

    find: async (email)=>{
        const user  = await User.findOne({email})
        return user
    }
}

module.exports = authUserService;