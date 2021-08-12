import { PostContext } from "../contents/PostContext"
import { AuthContext } from "../contents/AuthContext"
import { useContext ,useEffect } from "react"
import { Button, Col, OverlayTrigger, Spinner, Toast, Tooltip } from "react-bootstrap"
import { Card } from "react-bootstrap"
import { Row } from "react-bootstrap"
import Addicon from "../assets/plus-circle-fill.svg"
import SinglePost from "../component/posts/SinglePost"
import AddPostModal from "../component/posts/AddPostModal"
import UpdatePostModal from "../component/posts/UpdatePostModal"

const Dashboard=()=>{
    const {
        authState:{
            user:{username}
        }
    }=useContext(AuthContext)
    const {
		postState: {posts, postsLoading,post},
        getposts,
        setShowAddPostModal,
        ShowToast:{message,type,show},
        setShowtoat
	} = useContext(PostContext)

    useEffect(()=>getposts(),[]);
    let body=null;
    if(postsLoading){
        body=(
         <div className="cpinner-container">
             <Spinner animation="border" variant="info"></Spinner>
         </div>
        )
    }            
    else if(posts.length===0){
        body=(
            <>
             <Card className="text-center mx-5 my-5">
                  <Card.Header as='h1'> Hi {username} </Card.Header> 
                 <Card.Body>
                     <Card.Title>WelCome to leanIt</Card.Title>
                    <Card.Text> Click the button below to track your first skill to learn  </Card.Text>
                 <Button variant="primary" onClick={setShowAddPostModal.bind(this,true)} >
                    LearnIt
                 </Button>
                </Card.Body>
            </Card>
        </>
         )
    }
   else{
        body=(
            <>
    
            <Row className="row-cols-1 row-cols-md-3 g-4 mx-auto mt-3">
                {

                    posts.map(post=>(
                        <Col key={post._id} className="my-2">
   <SinglePost post={post}></SinglePost> 

                        </Col>
                    ))
                }
            </Row>
            {/* Open add post modal */}
            <OverlayTrigger
            placement="left"
            overlay={<Tooltip> Add a new thing to learn</Tooltip>}
            >
     <Button className="btn-floating" onClick={setShowAddPostModal.bind(this,true)}>
 <img src={Addicon} alt="AddIcon" width="60" height="60" ></img>
         
        </Button>
             </OverlayTrigger>

     {post!==null && <UpdatePostModal></UpdatePostModal>}

            </>
        )
    }
    return(
   // {body}
    
     <>
     {body}
     <AddPostModal></AddPostModal>
     {/* after post is add ,show toast  */}
     <Toast 
      show={show}
    style={{position:"fixed",right:"20px",top:"20%"}}
     className={`bg-${type} text-white`}
     onClose={setShowtoat.bind(this,{message:'',type:'',show:false})}
     delay={3000}
     autohide
     >
         <Toast.Body>
      <strong>  {message}  </strong>    
         </Toast.Body>
     </Toast>
     </>
     )
}
export default Dashboard