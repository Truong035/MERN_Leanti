import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import { Link, useHistory } from "react-router-dom"
 import { useState,useContext } from "react"
 import { AuthContext}from "../../contents/AuthContext"
 import AlertMessage from '../Layout/AlertMessage'
const LoginForm=()=>{
  const{loginUser}=useContext(AuthContext);
  const[LoginForm,setLoginForm]=useState({
      username:'',
      password:'',
  })

  const history=useHistory()
  const [alert,setAlert]=useState(null)
  const{username,password}=LoginForm
  const onchanggeLoginForm=event=>setLoginForm({...LoginForm,[event.target.name]:event.target.value})
  const login=async event=>{
      event.preventDefault()
      try {
          const loginData=await loginUser(LoginForm)
          console.log(loginData);
          if(loginData.success){
            history.push('/dashboard')
          }
          else{
            setAlert({type:"danger",message:loginData.message})
            setTimeout(() => setAlert(null), 3000);
          }

      } catch (error) {
          console.log(error);
      }
  }
  
  return (
<>

  <Form className="pb-2" onSubmit={login} >
    <AlertMessage info={alert} ></AlertMessage>
      <Form.Group className="pb-3" >
        <Form.Control
         type="text"
         name="username"
         placeholder="User name"
         required
         value={username}
          onChange={onchanggeLoginForm}
        ></Form.Control>
      </Form.Group>
      <Form.Group className="pb-3">
        <Form.Control
         type="text"
         placeholder="Password"
         name="password"
         required
        value={password}
         onChange={onchanggeLoginForm}
        ></Form.Control>
      </Form.Group>
      <Button variant="success" type="submit"> Login</Button>
  </Form>
  <p>
      Don't have an account ?
      <Link to='/register' className="pl-2"> 
      <Button variant="info" size="sm" > Register</Button>
      </Link> 
  </p>
</>
   )

}
export default LoginForm