import ProfileImage from '../profileComponents/ProfileImage'
import './userProfileTop.css'
import React, { useContext, useEffect, useState } from 'react'
import ProfileImageforUsers from '../profileComponents/ProfileImageforUsers';
import axios from '../../api/axios';
import { FollowContext, useStateValue } from '../../StateProvider';
import { FollowingState } from '../posts/Posts';
import { useNavigate } from 'react-router-dom';

function UserProfileTop({id}) {
    const [isFollowing, setIsFollowing] = useState(false)
    const [user, setUser] = useState(false)
    const { state } = useStateValue()
    const { followState, setFollowState } = useContext(FollowContext)
    const [count,setCount] = useState({post:0,followers:0,following:0})
    const navigate = useNavigate()

    useEffect(() => {
        
      
        async function getUser() {
            try {
                const res = await axios.get('/user/get-otherUser/' + id, { withCredentials: true })
                setUser(res.data)
            } catch (error) {
                console.log(error.response.data);
            }
        }   
        getUser()
    }, [id])

    useEffect(() => {
       
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
    }, [followState])
    
     useEffect(() => {
      async function getPostCount() {
            try {
                const res = await axios.get('/user/user-count/'+id,{withCredentials:true})
             
                 setCount((prev) => {
                 return ( {
                     posts: res.data.postCount,
                     followers: res.data.followers,
                     following: res.data.following,
                   } )
                })
            } catch (error) {
                console.log(error.response.data);
            }
        }   
        getPostCount()
  },[followState])

    const followUser = async () => {
        try {
            const res = await axios.get('/user/follow-user/'+id, { withCredentials:true })
            setFollowState(!followState)
        } catch (error) {
            console.log(error.res.data)
        }
    }
   const unfollowUser = async () => { 
        try {
            const res = await axios.get('/user/unfollow-user/'+id, { withCredentials:true })
            setFollowState(!followState)
        } catch (error) {
            console.log(error.res.data)
        }
    } 
   const startConversation = async () => { 
       try {
           const userObj = {
               senderId: state.user._id,
               receiverId:user._id
            }
            const res = await axios.post('/conversation',userObj, { withCredentials:true })
            console.log(res.data);
            navigate('/inbox/'+user._id)
        } catch (error) {
            console.log(error.res.data)
        }
    } 


  return (
      <div className='userProfileTop'>
          <div className='profileRight__container'>
              <ProfileImageforUsers width={'150px'} height={'150px'} profileImg={user.profileImg}/>
          <div className="userProfileTop__right">
            
              <div className="userProfileTop__right_top" >
                      <h1 className='userProfileTop__username'>{user?.username}</h1>
                      {
                        isFollowing ? <button className="editProfile__button" onClick={unfollowUser}>following</button>
                                                   : <button className="editProfile__button" onClick={followUser}>follow</button>
                             
                      }
                      <button className="editProfile__button" onClick={startConversation}>message</button>
                      
             </div>
               <div className="profileTop__right_bottom">
                  <p>{count.posts? count.posts : 0} posts</p>
                  <p>{count.followers? count.followers : 0} followers</p>
                  <p>{count.following? count.following : 0} following</p>
                  </div>

          </div>
          
          </div>
          <div className="userProfileTop__name">
              <p>{user?.name}</p>
          </div>
          <div className="userProfileTop__bio">
              <p>{user?.bio }</p>
          </div>

      </div>
  )
}

export default UserProfileTop