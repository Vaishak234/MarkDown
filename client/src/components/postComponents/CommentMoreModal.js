import React, { useContext } from 'react'
import './commentMoreModal.css'
import CloseIcon from '@mui/icons-material/Close';
import axios from '../../api/axios';
import { CommentContext } from '../post/Post';

function CommentMoreModal({ setShowMore, id, commentId,postUser }) {
    
    const { changeComment, setChangeComment } = useContext(CommentContext)

    const removeCommentsNotification = async() => {
     
        try {
            const res = await axios.post('/posts/notification/deleteComment',{postUser,postId:id,commentId}, { withCredentials: true })
            console.log(res.data);
           
        } catch (error) {
          console.log(error.response.data);
        }
    }

    const handleDelete = async () => {
        try {
            const res = await axios.post('posts/comment/delete',{postId:id,commentId}, { withCredentials: true })
            console.log(res.data);
            setShowMore(false)
            setChangeComment(!changeComment)
           // removeCommentsNotification()
        } catch (error) {
            console.log(error.res.data);
        }
    }

  return (
      <div className='commentMoreModal'>
          <div className="closeIcon" onClick={()=>setShowMore(false)}>
              <CloseIcon />
          </div>
          <div className="commentMoreModal__box">
              <p onClick={handleDelete}>Delete</p>
          </div>
       </div>
  )
}

export default CommentMoreModal