import { createContext,useReducer,useEffect } from "react"; 
import { Authreducer } from "../reducer/Authreducer";
import {apiURL,LOCAL_STORAGE_TOKEN_NAME} from "./Constants"
import axios from "axios";  
import setAuthToken from "../untils/setAuthToken";

export const AuthContext=createContext();

const AuthContextProvider=({children})=>{
    const [authState,dispatch]=useReducer(Authreducer,{
        authLoading:true,
        isAuthenticated:false,
        user:null,
    })
   
   //Authenticate user 
   const loadUser=async ()=>{

       if(localStorage[LOCAL_STORAGE_TOKEN_NAME]){
             setAuthToken(localStorage[LOCAL_STORAGE_TOKEN_NAME]);
       }
       try {
       //    console.log("s");
     
   const response=await axios.get(`${apiURL}/auth`);

    if(response.data.success){
     dispatch({
     type:'SET_AUTH',
     payload:{isAuthenticated:true, user:response.data.user}
 })
      }
    //   else{
    //     localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
    //     setAuthToken(null);
    //     dispatch({type:'SET_AUTH',payload:{isAuthenticated:false,user:null}})
    //   }
   
       } catch (error) {
         
           localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
           setAuthToken(null);
           dispatch({type:'SET_AUTH',payload:{isAuthenticated:false,user:null}})
        
    }                                      
   }

   useEffect(()=> loadUser(), [])
   //register
   const registerUser=async registerForm=>{
//console.log(registerForm+"s");
       try {
           const response=await axios.post(`${apiURL}/auth/register`,registerForm);
           if(response.data.success){
            localStorage.setItem(
                LOCAL_STORAGE_TOKEN_NAME,
                response.data.accesstoken)
               await loadUser()
           }
    return response.data
       } catch (error) {
        if(error.response.data) return error.response.data
        else{ return {success:false,message:error.message}}
       }
   }
   //logoutUser
   const logoutUser=()=>{
    localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
    setAuthToken(null);
    dispatch({type:'SET_AUTH',payload:{isAuthenticated:false,user:null}})
 
   }
    //login 
    const loginUser=async userForm=>{
        try {
           const response=await axios.post(`${apiURL}/auth/login`,userForm);
     
           if (response.data.success){
            localStorage.setItem(
                LOCAL_STORAGE_TOKEN_NAME,
                response.data.accesstoken
            )

			await loadUser()
           }
		
			return response.data
     
        } catch (error) {
            
           if(error.response.data) return error.response.data
           else{ return {success:false,message:error.message}}
        }
    }
    
const AuthContextData={loginUser,authState,registerUser,logoutUser}
return (
    <AuthContext.Provider value={AuthContextData}>
      {children}
    </AuthContext.Provider>
)
}
export default AuthContextProvider