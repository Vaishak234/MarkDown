import React, { useEffect, useState } from 'react'
import './comment.css'
import ProfileImageforUsers from '../profileComponents/ProfileImageforUsers'
import { Link } from 'react-router-dom'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import CommentMoreModal from './CommentMoreModal';
import { useStateValue } from '../../StateProvider';

function Comment({ comment }) {
 
  const [showMore, setShowMore] = useState(false)
  const { state } = useStateValue()
  
  useEffect(() => {
    if (showMore) {
      
    }
  },[])

  return (
    <>
    <div className="commentContainer">
      <div className='comment'>
          <ProfileImageforUsers width={'40px'} height={'40px'} profileImg={comment.profileImg}/>
          <div className="comment__right">
              <div className="comment__box">
          <Link to={'/'+comment.commentUser} className="username">{comment.username}</Link>
          <p className="comment__dec">{comment.comment}</p>
              </div>
              {/* <p className="timeStamp">9 hr</p> */}
          </div>
      </div>
        {
          state.user._id === comment.commentUser && <div className="icon" onClick={()=>{setShowMore(true)}}>
             <MoreHorizIcon />
          </div>
        }
      </div>

      {
        showMore &&  <CommentMoreModal postUser={comment.commentUser}   commentId={comment.commentId} id={comment._id} setShowMore={setShowMore}/>
      }
      
    </>
  )
}

export default Comment