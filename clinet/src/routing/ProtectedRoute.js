 import {Route,Redirect} from "react-router-dom"
 import { useContext } from "react"
 import { AuthContext } from "../contents/AuthContext"
 import { Spinner } from "react-bootstrap"
import NavbarMenu from "../component/Layout/NavbarMenu"
 const  ProtectedRoute=({component:Component,...rest})=>{
     const{
         authState:{authLoading,isAuthenticated}
     }=useContext(AuthContext)
    
    //  if(authLoading)
    //  return(
    //   <div className="spinner-container">
    //       <Spinner animation="border" variant="info"></Spinner>
    //   </div>
    //  )

     return (
         
         <Route {...rest} render={props=>isAuthenticated ? (<>
           <NavbarMenu></NavbarMenu>
         <Component {...rest} {...props}/>
       
         </>):(<Redirect to="/login"/>)} />
     )
 }
export default ProtectedRoute