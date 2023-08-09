//import token
const jwt =require('jsonwebtoken')
//middleware is a function
//middleware have 3 arguments-req,res,next

 const jwtMiddleware=(req,res,next)=>{
    //access token from request header(fontend)
    try{
        //runtime error solve cheyyn
        const token=req.headers["access_token"]
        //token validation- jwt - verify()  
        jwt.verify(token,"privatekey123") //true/false
        // if token is verified continue the request
        next()
      }
    catch{
        res.status(404).json("please login")
    }
    
}
module.exports=jwtMiddleware