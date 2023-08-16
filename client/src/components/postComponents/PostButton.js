import React, { useContext, useEffect, useState } from 'react'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CommentIcon from '@mui/icons-material/Comment';
import TelegramIcon from '@mui/icons-material/Telegram';
import DownloadIcon from '@mui/icons-material/Download';
import FavoriteIcon from '@mui/icons-material/Favorite';
import './postButton.css'
import axios from '../../api/axios';
import { LikeContext } from '../post/Post';
import CommentSection from './CommentSection';

function PostButton({ id,postUser ,liked, setLiked,likesCount,setLikesCount,commentBoxOpen,setCommentBoxOpen }) {
   
    const { likeState, setLikeState } = useContext(LikeContext)
   

    const addLikesNotification = async() => {
     
        try {
            const res = await axios.post('/posts/notification/likes',{postUser,postId:id}, { withCredentials: true })
            console.log(res.data);
           
        } catch (error) {
          console.log(error.response.data);
        }
    }

    const removeLikesNotification = async() => {
     
        try {
            const res = await axios.post('/posts/notification/dis-likes',{postUser,postId:id}, { withCredentials: true })
            console.log(res.data);
           
        } catch (error) {
          console.log(error.response.data);
        }
    }

     const likeFunctionality = async() => {
        try {
            const res = await axios.get('/posts/like-disLike/' + id, { withCredentials: true })
            console.log(res.data);
            if (res.data.liked) {
                addLikesNotification()
            }
            else {
                removeLikesNotification()
            }
           setLikeState(!likeState)
        } catch (error) {
           setLikeState(!likeState)
        }
    }
    
   
  return (
      <>
          <div className='postButton'>
          <div className="left">
              <p className="likeBtb" role='button' onClick={likeFunctionality}>
                  {
                      liked ? <FavoriteIcon style={{ color: 'red'}}/> :  <FavoriteBorderIcon />
                  }
              </p>
                  <div onClick={()=>{setCommentBoxOpen(!commentBoxOpen)}}>
                      <CommentIcon />
                 </div>
              <TelegramIcon/>
          </div>
          <div className="right">
              <DownloadIcon />
          </div>
          </div>
          {
              likesCount !== 0 &&   <div className="postButtonDec">
                                         <p className="noOfLikes"><span>{likesCount}</span>  likes</p>
                                    </div>
          }

      
      </>
  )
}

export default PostButton