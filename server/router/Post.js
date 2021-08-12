const express =require('express');
const router=express.Router();
const verifyToken=require('../middleware/auth');
const Post=require('../modell/Post');
const { post } = require('./auth');

/*
Router api/Post
descriptin List all post user 
access private 
*/
router.get('/',verifyToken, async(req,res)=>{
    const userId=req.userId;
    try {
        const ListAll=await Post.find({user:userId}).populate("user",["username","creatAt"])
       return res.json({
           success:true,
           message :"List all post of user",
           posts:ListAll
       })
    } catch (error) {
        return res.status(403).json({
            success:false,
            message :"Errol"+error
        })
    }
});


/*
Router api/Post/CreatePost
desscription create post user
access private 
*/ 
router.post('/',verifyToken, async(req,res)=>{
    const{title,description,url,status}=req.body;
    const userID=req.userId;
    if(!title){
        return res.status(400).json({
            success:false,
            message :"Title is require",
        })
    }
    console.log(description)
    const newPost=new Post({
        title,
        description,
        url:((url.startsWith('http://') || url.startsWith('https://') )? url:`https://${url}`) ||' ',
        status:status || "TO LEARN",
        user:userID
    })
    await newPost.save();
    return res.json({
        success:true,
        message :"Create success",
        newPost
    })
})

/*
Router api/post/updatePost
descrition update post of user
acress private
 */
router.put('/updatePost/:id',verifyToken,async(req,res)=>{
  const {title,description,url,status}=req.body
  if(!title){
      return res.status(400).json({
          success:false,
          message :"Title is require",
      })
  }
  try {
      let UpdatePost={
          title,
          description:description || ' ',
          url:((url.startsWith('http://') || url.startsWith('https://') )? url:`https://${url}`) ||' ',
          status:status || "TO LEARN"
      };
      console.log(req.params.id);
      const updatePostCondition={_id:req.params.id,user:req.userId};
      UpdatePost=await Post.findByIdAndUpdate(updatePostCondition,UpdatePost,{new :true})
      if(!UpdatePost){
          return res.json({
              success:false,
              message :"Post not found or user not authorised"
          })
      }
      res.json({success:true,message:"Post success" ,UpdatePost});
      
  } catch (error) {
    return res.status(500).json({
        success:false,
        message :"Error"+error
    })
  }

});
/*
Route api/port/DELETE
description delete post of user
access private
*/
router.delete('/Deletepost/:id',verifyToken,async(req,res)=>{
 try {
     const DeleteportCondition={_id:req.params.id,user:req.userId};
     const deletePost=await Post.findByIdAndDelete(DeleteportCondition);
     if(!deletePost){
        return res.status(400).json({
            success :false,
            message :"User not authorised or post not found"
   
        })
     }
     return res.json({
        success :true,
        Post:deletePost,
        message :"delete success"

    })
 } catch (error) {
    console.log(error)
    res.status(500).json({success:false,message:"Errol",})
   
 }
})

module.exports=router;