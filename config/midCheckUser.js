module.exports = checkUser =(req,res,next)=>{
    if(req.payload.type==='user'){
        next()
    } else{
        throw new Error("you are not user")
    }
}