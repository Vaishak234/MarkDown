import React, { createContext, useContext, useState } from 'react'
import './postComment.css'
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import EmojiPicker from 'emoji-picker-react';
import axios from '../../api/axios';
import { CommentContext } from '../post/Post';


function PostComment({ id ,postUser}) {

    const [emoji, setEmoji] = useState(false)
    const [showSubmit, setShowSubmit] = useState(false)
    const [comment, setComment] = useState(null)
    const {changeComment, setChangeComment} = useContext(CommentContext)
    
    const selectEmoji = () => {
       setEmoji(!emoji)
    }

    const addComment = (e) => {
        setShowSubmit(true)
        setComment(e.target.value)
    }

     const addCommentsNotification = async() => {
     
        try {
            const res = await axios.post('/posts/notification/comments',{postUser,postId:id,comment}, { withCredentials: true })
            console.log(res.data);
           
        } catch (error) {
          console.log(error.response.data);
        }
    }

    const handleSubmit = async (e) => {
        const postObj = {
            comment,
            postId:id
        }
        e.preventDefault()
        if (comment !== '') {
              try {
                const res = await axios.post('/posts/comment',postObj,{withCredentials:true})
                console.log(res.data);
                  if (res.data) {
                  addCommentsNotification()
                  setComment('')
                  setChangeComment(!changeComment)
              }
            } catch (error) {
                console.log(error.response.data);
            }
       }
     }

  return (
      <>
           <form onSubmit={handleSubmit} className='postComment'>
              <div className="postComment__left">
                  <input type="text" value={comment} onChange={addComment} placeholder='Add comment' />
              </div>
              <div className="postComment__right" onClick={selectEmoji}>
                  {
                      showSubmit && <button type='submit' className="sumbit_comment">post</button>
                  }
                  {/* <EmojiEmotionsIcon  /> */}
              </div>
          
          </form>
          {/* {
              emoji && (<div className="emojiPicker">
                           <EmojiPicker/>
                        </div>)
          } */}
      </>
  )
}

export default PostComment