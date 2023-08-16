import React, { useContext, useEffect, useState } from 'react'
import './postImage.css'
import FavoriteIcon from '@mui/icons-material/Favorite';
import axios from '../../api/axios';
import { LikeContext } from '../post/Post';


function PostImage({ img ,id,postUser}) {
  
  const [heartIcon, setHeartIcon] = useState(false)
  const { likeState, setLikeState } = useContext(LikeContext)
  const [isFollowing, setIsFollowing] = useState(false)
  
   const addLikesNotification = async() => {
     
        try {
            const res = await axios.post('/posts/notification/likes',{postUser,postId:id}, { withCredentials: true })
            console.log(res.data);
           
        } catch (error) {
          console.log(error.response.data);
        }
    }
  const likeFunctionality = async () => {
     
        try {
            const res = await axios.get('/posts/like/' + id, { withCredentials: true })
          console.log(res.data);
          if (res.data.liked) {
              addLikesNotification()
          }
        
            setLikeState(true)
           
        } catch (error) {
          console.log(error.response.data);
           setLikeState(false)
        }
    }
   
    
  const showHeart = () => {
    setHeartIcon(true)
    likeFunctionality()
    setTimeout(() => {
      setHeartIcon(false)
    },1500)
  }

  return ( 
    <>
      
      <div className='postImage' onDoubleClick={showHeart}>
        {
           heartIcon && <FavoriteIcon className='favIcon' />
        }
          <img src={"http://localhost:4000/post-images/" + img} alt="" />
      </div>

   </>
  )
}

export default PostImage