import { useContext, useEffect, useState } from "react"
import { Button, Form, Modal } from "react-bootstrap"
import { PostContext } from "../../contents/PostContext"



const UpdatePostModal=()=>{
const{showUpdatePostModal,setShowUpdatePostModal,setShowtoat ,UpdatePost,postState:{post}}=useContext(PostContext) 

const[UpdatePostForm,setUpdatePost]=useState(post);
useEffect(()=>setUpdatePost(post),[post]);
const onChangeUpdatePostForm=event=>setUpdatePost({...UpdatePostForm,[event.target.name]:event.target.value})

const onSubmit= async event=>{
    event.preventDefault();
 const {success,message}=await UpdatePost(UpdatePostForm);
 setShowtoat({message:message ,show:true,type:success ?'success':"danger"})
CloseForm();
}
const CloseForm=()=>{
    setUpdatePost(post);
 setShowUpdatePostModal(false);

}

 const {title,description,url,status}=UpdatePostForm
return(
<>
<Modal show={showUpdatePostModal} onHide={CloseForm}>
    <Modal.Header closeButton >
        UpdatePost
    </Modal.Header>
    <Form onSubmit={onSubmit}>
    <Modal.Body>
        <Form.Group>
      <Form.Control
      type="text"
      required
      value={title}
      name="title"
      onChange={onChangeUpdatePostForm}
      placeholder="Title"
      >
      </Form.Control>
      <Form.Text> Required </Form.Text>
     </Form.Group>     
   <Form.Group>
       <Form.Control
       as="textarea"
       placeholder="Desscription"
       rows={3}
    
       value={description}
       onChange={onChangeUpdatePostForm}
       name="description"
       >
       </Form.Control>
   </Form.Group>
   <Form.Group>
       <Form.Control
       type="text"
       placeholder="Url"
       value={url}
       name="url"
       onChange={onChangeUpdatePostForm}
       >
       </Form.Control>

   </Form.Group>
   <Form.Group>
    <Form.Control
    as="select"
    value={status}
    name="status"
    onChange={onChangeUpdatePostForm}
    >
   <option value="TO LEARN"> TO LEARN </option>
   <option value="LEARNING"> LEARNING </option>
   <option value="LEARNED"> LEARNED </option>

    </Form.Control>

   </Form.Group>


    
 
    </Modal.Body>
    <Modal.Footer>
                    <Button variant="secondary" onClick={CloseForm} > Cancel</Button>
                    <Button variant="primary" type="submit" > LearnIt !  </Button>
                </Modal.Footer>
                </Form>
</Modal>
</>

)

}
export default UpdatePostModal