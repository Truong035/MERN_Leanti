const jwt=require('jsonwebtoken');

/*
  check user login
*/
const verifyToken=(req,res,next)=>{
  const authHearder=req.header('Authorization');
  const token=authHearder && authHearder.split(' ')[1];
  if(!token){
      return res.status({
          success:false,
          message:"Acess token not found"
      })
  }
  
  try {
    const decoded= jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
    req.userId=decoded.userId

    next()
  } catch (error) {
      return res.status(403).json({
        success:false,
          message:"Error " +error.message
      })
  }
 
}
module.exports=verifyToken;