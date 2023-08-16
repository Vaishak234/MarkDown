import React, { createContext, useContext, useEffect, useState } from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import './postTitle.css'
import ProfileImageAvatar from '../profileComponents/ProfileImageAvatar';
import ProfileImageforUsers from '../profileComponents/ProfileImageforUsers';
import { FollowContext, useStateValue } from '../../StateProvider';
import axios from '../../api/axios';
import { Link } from 'react-router-dom';
import {format} from 'timeago.js'

function PostTitle({ username, profileImg ,id , createdAt}) {
    const [otherUser, setOtherUser] = useState()
    const [notMyPost, setNotMyPost] = useState(false)
    const [isFollowing, setIsFollowing] = useState(false)
    const {followState,setFollowState} = useContext(FollowContext)
    const { state } = useStateValue(false)

   const followUser = async () => {
        try {
            const res = await axios.get('/user/follow-user/'+id, { withCredentials:true })
            setFollowState(!followState)
        } catch (error) {
            
        }
    }
   const unfollowUser = async () => { 
        try {
            const res = await axios.get('/user/unfollow-user/'+id, { withCredentials:true })
            setFollowState(!followState)
        } catch (error) {
            
        }
    } 


    useEffect(() => {

        if (id !== state.user._id) {
            setNotMyPost(true)
        }
        const checkFollowing = async () => {
            try {
               const res = await axios.get('/user/isfollowing/' + id, { withCredentials: true })
                if (res.data.status) {
                      setIsFollowing(true) 
                  } else {
                    setIsFollowing(false) 
                  }
                }catch (error) {
                    console.log(error.response.data)
                }
        }
      
        checkFollowing()
   },[followState])
  
    
    
    
  return (
      <div className='postTitle'>
          <Link to={'/'+id} >
            <div className="postTitle__left">
                     <ProfileImageforUsers profileImg={profileImg} width={'40px'} height={'40px'} />
                    <p className="username">{username}</p>
                  <span className='timestamp'>{format(createdAt)}</span>
            </div>
          </Link>
          <div className="postTitle__right">
              {
               notMyPost &&   (isFollowing ? <button onClick={unfollowUser}  className="follow__button">following</button>
                                           : <button onClick={followUser}  className="follow__button">follow</button>
              )
             }
          </div>
      </div>
  )
}

export default PostTitle