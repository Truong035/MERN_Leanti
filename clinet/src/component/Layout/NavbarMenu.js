import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import learnItLogo from "../../assets/logo.svg"
import logoutIcon from "../../assets/logout.svg"
import { AuthContext } from '../../contents/AuthContext';
import { useContext } from 'react';
const NavbarMenu=()=>{
 const{
     authState:{
         user:{username}},
         logoutUser
     }=useContext(AuthContext);
                
 const logout=()=>logoutUser()
    return(
        <>
        
        <Navbar expand="lg" bg="primary" variant="dark" className="shadow" >
        <Navbar.Brand>
        <img src={learnItLogo} alt="learnit" width="32" height="32" className="mr-2">

        </img>LearnIt
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
        <Navbar.Collapse id="basic-navbar-nav">
<Nav className="mr-auto">
         <Nav.Link className="font-weight-bolder text-white" to="/dashboard" as={Link}>
            Dashboard
         </Nav.Link>
         <Nav.Link className="font-weight-bolder text-white" to="/about" as={Link} >
         About
         </Nav.Link>
  
           </Nav>
        
           
            </Navbar.Collapse> 
            <Nav className="justify-content-end" style={{marginLeft:0}}>
               <Nav.Link className="font-weight-bolder text-white" disabled > 
                 Welcome {username} 
               </Nav.Link>
               <Button variant="secondary" className="font-weigt-bolder text-white" onClick={logout}>
                  <img src={logoutIcon} alt="logout" width='32' height="32" ></img>
                 Logout
               </Button>
             
           </Nav>      
 
        </Navbar>
        
        </>
    )
}
export default NavbarMenu