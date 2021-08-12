import { useContext, useState } from "react"
import { Button, Form, Modal } from "react-bootstrap"
import { PostContext } from "../../contents/PostContext"


const AddPostModal=()=>{
    const{showAddPostModal,setShowAddPostModal,AddPost,setShowtoat}=useContext(PostContext);
    const[newPost,setNewPost]=useState({
        title:'',
        description:'',
        url:'',
        status:"TO LEARN"
    });
    const {title,description,url}=newPost
    const onChangenewPostForm=event=>setNewPost({...newPost,[event.target.name]:event.target.value})
   const onSubmit= async event=>{
      event.preventDefault()
    
    
    // try {
       const {message,success}=await AddPost(newPost);  

    setShowtoat({show:true,message:message,type:success ? 'success': 'danger'})
      
     // } catch (error) {
        //  console.log(error)
     // }
      CloseDialog();
   }
 
    const CloseDialog=()=>{
 setShowAddPostModal(false);
 setNewPost({title:'',url:'',description:'',status:'TO LEARN'});
   }
    return(
        <>
        <Modal show={showAddPostModal}  onHide={CloseDialog}>
            <Modal.Header closeButton>
<Modal.Title>
    What do you want to  learn ?
</Modal.Title>
            </Modal.Header>
            <Form className="container" onSubmit={onSubmit}>
                <Form.Group>
                    <Form.Control type="text" placeholder="Title" name="title"
                    required aria-describedby=""
                    value={title}
                    onChange={onChangenewPostForm}
                    ></Form.Control>
                    <Form.Text id="title-help"> Required</Form.Text>
                </Form.Group>
                <Form.Group>
                    <Form.Control
                    as="textarea"
                    rows={3}
                    name="description"
                    value={description}
                    placeholder=" Description"
                    onChange={onChangenewPostForm}
                    ></Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Control
                    type="text"
                    placeholder="Youtube Tutorial URL"
                    name="url"
                    onChange={onChangenewPostForm}
                    value={url}
                    ></Form.Control>
                </Form.Group>
                <Modal.Footer>
                    <Button variant="secondary" onClick={CloseDialog}> Cancel</Button>
                    <Button variant="primary" type="submit"> LearnIt !  </Button>
                </Modal.Footer>
            </Form>
        </Modal>
        
        
        </>
    )
}
export default AddPostModal