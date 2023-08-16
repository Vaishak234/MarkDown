import React, { useContext, useEffect, useState } from 'react'
import './userProfile.css'
import ProfileTop from '../ProfileTop/ProfileTop'
import ProfilePosts from '../profileComponents/ProfilePosts'
import axios from '../../api/axios'
import UserProfileTop from './UserProfileTop'
import { FollowContext, useStateValue } from '../../StateProvider'
import { Navigate, useNavigate } from 'react-router-dom'


function UserProfile({ id }) {
  const [posts,setPosts]= useState([])
  const [otherUser, setOtherUser] = useState({})
  const [myProfile, setMyProfile] = useState(false)
  const {state} = useStateValue()
  const navigate = useNavigate()
  const {followState,setFollowState} = useContext(FollowContext)

  // useEffect(() => {
  //    async function getUserExist() {
  //           try {
  //             const res = await axios.get('/user/userExist/' + id, { withCredentials: true })
               
  //           } catch (error) {
  //               console.log(error.response.data);
  //           }
  //       }   
  //       getUserExist() 
  // },[id])
 

  useEffect(()  => {
        setFollowState(false)
        async function getPosts() {
            try {
              const res = await axios.get('/user/otherUser-post/' + id, { withCredentials: true })
               
                setPosts(res.data)
            } catch (error) {
                console.log(error.response.data);
            }
        }   
        getPosts()
    }, [id])
    
   useEffect(() => {
     if (id === state.user._id) {
            setMyProfile(true)
         }
   },[myProfile])
   
 


  return (
    <>
      {
          myProfile && <Navigate to={'/profile'} replace={true}/>
      }
          
      <div className="profileContainer">
      <div className='profile'>
              <UserProfileTop id={id}/>
              <ProfilePosts posts={posts}  user={id} />
            </div>
      </div>
    </>
  )
}

export default UserProfile