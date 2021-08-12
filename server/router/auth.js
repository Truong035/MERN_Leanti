const express=require('express');
const router=express.Router();
const argon2=require('argon2');
const User=require('../modell/User');
const jwt=require("jsonwebtoken");
const verifyToken=require("../middleware/auth")
/*
  Router api/
  check if user is login 
  access public
*/
router.get('/',verifyToken,async(req,res)=>{
  try {
    const user=await User.findById(req.userId).select("-password");
    if(!user){
        return res.status(400).json({success:false,
            message:"user not found"});
     
    }
    return res.json({success:true,message:"login success",user:user})
  } catch (error) {
      return status(500).json({success:false,message:"Internal server error"});
  }
})

/*
Router POSt register 
desciption register user
acess Punlic
*/
router.post('/register',async(req,res)=>{
 const {username,password}=req.body;
 if(!username,!password){
     return res.status(400).json({
         success:false,
         message:'Missing username and or password '
     });
 }
 else{
     try {
        const user= await User.findOne({username:username});
        if(user){
            return res.status(400).json({
                success:false,
                message:'Username aready to taken'
            })
        }
        // all good
        const hasspassword= await argon2.hash(password);
        const newUser=new User({username:username,password:hasspassword});
        await newUser.save();
        const accesstoken=await jwt.sign({userId:newUser._id},process.env.ACCESS_TOKEN_SECRET);
        res.json({success:true,message:"Creat user succcess",accesstoken})
     } catch (error) {
         console.log(error.message);
         res.json({success:false,message:"errol"});
     }
 }


});
/*
Router Port api/login
descripton login user
acess public
*/
router.post(`/login`,async(req,res)=>{
 const {username,password}=req.body;
  
 if(!username,!password){
 return res.status(400).json({
     success:false,
     message:'missing username and or password'
 })    
 }
 else{
  try {
      const user=await User.findOne({username});
      if(!user){
       return res.json({
           success:false,
           message:"incorrect user name"
       })
      }
      const checkpassword=await argon2.verify(user.password,password);
      if(!checkpassword){ 
          return res.json({
              success:false,
              message:"incorrect password"
          })
        }
        // all good
  const accesstoken=jwt.sign({userId:user._id},process.env.ACCESS_TOKEN_SECRET);
   return res.json({
       success:true,
       message:'Connect success',
       accesstoken:accesstoken
   }) 
  } catch (error) {
      return res.status(403).json({
        success:false,
        message:"incorrect token "+error.message  
      })
  }
 }
})

// Router api apu
module.exports=router;