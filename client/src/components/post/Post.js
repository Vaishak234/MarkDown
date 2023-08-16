import React, { createContext, useContext, useEffect, useState } from 'react'
import './post.css'
import PostImage from '../postComponents/PostImage'
import PostButton from '../postComponents/PostButton'
import PostTitle from '../postComponents/PostTitle'
import PostDec from '../postComponents/PostDec'
import PostComment from '../postComponents/PostComment'
import { FollowContext } from '../../StateProvider'
import axios from '../../api/axios'
import CommentSection from '../postComponents/CommentSection'

export const LikeContext = createContext()
export const CommentContext = createContext()

function Post({ item }) {

 
  const [likeState, setLikeState] = useState(false)
  const [liked, setLiked] = useState(false)
  const [likesCount, setLikesCount] = useState(0)
  const [commentBoxOpen, setCommentBoxOpen] = useState(false)
  const [comments,setComments] = useState([])
  const [changeComment,setChangeComment] = useState(false)
  
   useEffect(() => {
        const getLikesCount = async() => {
        try {
            const res = await axios.get('/posts/likes/count/'+item._id, { withCredentials: true })
            setLikesCount(res.data)
        } catch (error) {
            console.log(error.response.data);
          }
        }
        getLikesCount()
   }, [likeState])
  
   useEffect(() => {
        const getComments = async() => {
        try {
            const res = await axios.get('/posts/comment/all/'+item._id, { withCredentials: true })
            setComments(res.data)
        } catch (error) {
            console.log(error.response.data);
          }
        }
        getComments()
    },[changeComment])

  useEffect(() => {
        const checkIsLiked = async() => {
        try {
            const res = await axios.get('/posts/is-liked/'+item._id, { withCredentials: true })
          
            if (res.data.liked) {
                setLiked(true)
            } else {
                setLiked(false)
            }
        } catch (error) {
            console.log(error.response.data);
        }
        }
        checkIsLiked()
    },[likeState])
  
  return (
    <LikeContext.Provider value={{likeState,setLikeState}}>
      <div className='post'>
      <PostTitle username={item.username} id={item.user} createdAt={item.createdAt} profileImg={item.profileImg} />
      <PostImage img={item.post} postUser={item.user}  id={item._id} />
      <PostButton id={item._id} postUser={item.user} liked={liked} setLiked={setLiked} likesCount={likesCount} setLikesCount={setLikesCount} commentBoxOpen={commentBoxOpen} setCommentBoxOpen={setCommentBoxOpen}/>
        <PostDec username={item.username} dec={item.dec} />

        <CommentContext.Provider  value={{changeComment,setChangeComment}}>
              
        {
          commentBoxOpen && <CommentSection comments={comments} />
        }
        
        <PostComment id={item._id} postUser={item.user}/>
       
        </CommentContext.Provider>

       </div> 
      
    </LikeContext.Provider>
  )
}

export default Post