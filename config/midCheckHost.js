module.exports = checkHost =(req,res,next)=>{
    if(req.payload.type==='host'){
        next()
    } else{
        throw new Error("you are not host")
    }
}