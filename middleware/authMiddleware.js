export const Checkemail=(req,res,next)=>{
    try{
        const {email} =req.body;
        if(!email) return res.send("Email is not present in the middleware!");
        next();

    }catch(error){
        return res.send("error");
    }
}