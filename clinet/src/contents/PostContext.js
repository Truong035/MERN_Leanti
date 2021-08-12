import { createContext,useReducer ,useState} from "react";
import { apiURL,POSTS_LOADED_FAIL,POSTS_LOADED_SUCCESS ,ADD_POST} from "./Constants";
import axios from "axios";
import { Postreducer } from "../reducer/Postreducer";

export const PostContext=createContext()
const PostContextProvider=({children})=>{
                    
    const [postState, dispatch] = useReducer(Postreducer, {
        post:null,
		posts: [],
		postsLoading: true
	})
 const [showAddPostModal,setShowAddPostModal]=useState(false)
 const [showUpdatePostModal,setShowUpdatePostModal]=useState(false)
                         
  const [ShowToast,setShowtoat]=useState({
      message:'',
      type:'',
      show:false
  })
    //Get all post
    const getposts=async()=>{
        try {
          
			const response = await axios.get(`${apiURL}/post`)
            
			if (response.data.success) {
              //  console.log(response.data)
				dispatch({ type: POSTS_LOADED_SUCCESS, payload: response.data.posts})
			}
         //   console.log(postState.payload+"sau")
		} catch (error) {
            console.log(error)
			dispatch({ type: POSTS_LOADED_FAIL })
		}
    }
    //Addpost 
    const AddPost=async newPost=>{
        try {
        
            const response=await axios.post(`${apiURL}/post`,newPost)
            
            if(response.data.success){
            //    await getposts();
                //console.log(postState.posts.lenght+"sau")
          
           dispatch({
               type:ADD_POST,
               payload:response.data.newPost
           })
        
            }
            return response.data
        } catch (error) {
            if(error.response.data){
                console.log(error.response.data)
            }
            else{
                console.log(error)
            }

        }
    }
  // Find post
  const FindPost =(id)=>{

     postState.posts.map(post=>{
      if(post._id===id){
         // alert("s")
        postState.post=post
      }
     })
  }
  //UpdatePost
  const UpdatePost=async UpdatePostForm=>{
      try {
          const response=await axios.put(`${apiURL}/Post/updatePost/${UpdatePostForm._id}`,UpdatePostForm)
          if(response.data.success){
              //const newpost=[];
       const newpost= postState.posts.map(post=>{
                if(post._id===response.data.UpdatePost._id){
                    post=response.data.UpdatePost;
                    
                }
                return post;
            })
            postState.posts=newpost
          }

          postState.post=null;
        
       
          return response.data
      } catch (error) {
          
      }
  }
  //Deletepost
const Deletepost=async _id=>{
    try {
        const response= await axios.delete(`${apiURL}/post/Deletepost/${_id}`)
  
  if(response.data.success){
            
  
    postState.posts=postState.posts.filter(post => post._id !==_id)
    console.log( postState.posts);
  }
  return response.data
    } catch (error) {
        console.log(error);
    }
  
}

    const PostContextData={
        postState,
        getposts,
        showAddPostModal,
        setShowAddPostModal,
        AddPost,
        setShowtoat,
        ShowToast,
        showUpdatePostModal,
        setShowUpdatePostModal,FindPost,
        UpdatePost,
        Deletepost
    
    };
    return(
        <PostContext.Provider value={PostContextData}>
            {children}
        </PostContext.Provider>
    )
}
export default PostContextProvider