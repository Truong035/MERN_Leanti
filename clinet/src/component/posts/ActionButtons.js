import Button from 'react-bootstrap/Button'
import playIcon from '../../assets/play-btn.svg'
import editIcon from '../../assets/pencil.svg'
import deleteIcon from '../../assets/trash.svg'
import { useContext,useState } from 'react'
import { PostContext } from '../../contents/PostContext'

const ActionButtons = ({ url, _id }) => {
    const{showUpdatePostModal,setShowUpdatePostModal,setShowtoat,FindPost,Deletepost}=useContext(PostContext) 
  
	const ChosePost=(_id)=>{
    FindPost(_id);

 setShowUpdatePostModal(true)
    }
    const DeleteForm=async (_id)=>{
     const {success,message}= await Deletepost(_id);
 
     setShowtoat({message:message,show:true,type:success ? "success":"danger"})
    }
    

	return (
		<>
			 <Button className="post-button" href={url} target="_blank">
        <img src={playIcon} alt="play" width="32" height="32"></img>
    </Button>
    <Button className="post-button" >
        <img src={editIcon} alt="Edit" width="32" onClick={ChosePost.bind(this,_id)} height="32"></img>
    </Button>
    <Button className="post-button">
        <img src={deleteIcon} alt="delete" width="32" onClick={DeleteForm.bind(this,_id)} height="32"></img>
    </Button>
		</>
	)
}

export default ActionButtons