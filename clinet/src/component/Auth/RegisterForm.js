import { Button } from "react-bootstrap"
import { Link,useHistory } from "react-router-dom"
import { Form } from "react-bootstrap"
import { useState,useContext } from "react"
import { AuthContext } from "../../contents/AuthContext"
import AlertMessage from '../Layout/AlertMessage'
const Regigter=()=>{

    const {registerUser}=useContext(AuthContext);
    const [registerForm,setRegisterForm]=useState({
        username:'',
        password:'',
        confirmpassword:''
    })
    const[alert,setAlert]=useState(null)
    const history=useHistory()
    const {username,password,confirmpassword}=registerForm
    const onchanggeRegisterForm=event=>setRegisterForm({...registerForm,[event.target.name]:event.target.value})
   const register=async event=>{
       event.preventDefault()
       if(password!==confirmpassword){
        setAlert({type:"danger",message:"Password do not match"})
        setTimeout(() => setAlert(null), 3000);
       }
       else{
        try {
        //    console.log(registerForm);
           const registerData=await registerUser(registerForm)
            if(registerData.success){
                console.log(registerData)
                history.push(`/dashboard`);
            }
            else{
                setAlert({type:"danger",message:registerData.message});
                setTimeout(() => {
                   setAlert(null) 
                }, 3000);
            }
            console.log(registerData)
        } catch (error) {
            console.log(error);
        }
       }
     
   }
   return(
<>
<Form onSubmit={register}>
<AlertMessage info={alert} ></AlertMessage>
    <Form.Group className="pb-2">
      <Form.Control
      type="text"
      required
      name="username"
      value={username}
      onChange={onchanggeRegisterForm}
      placeholder="User name"
      />
      </Form.Group>
       <Form.Group className="pb-2">
     <Form.Control
      type="password"
      required
      name="password"
      value={password}
      onChange={onchanggeRegisterForm}
      placeholder="Password"/>
      </Form.Group>
      <Form.Group className="pb-2">
  <Form.Control
      type="password"
      required
      name="confirmpassword"
      value={confirmpassword}
      onChange={onchanggeRegisterForm}
      placeholder="Comfirm password"/>
    </Form.Group>
    <Button variant="success" type="submit"> Register </Button>
</Form>
<p>
    Alredy have an account ? 
    <Link to="/login">
        <Button variant="info" size="sm" className="ml-3"> Login</Button>
    </Link>
</p>
</>

    )
}
export default Regigter