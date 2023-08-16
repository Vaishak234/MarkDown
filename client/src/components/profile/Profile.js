import { useStateValue } from '../../StateProvider'
import axios from '../../api/axios'
import ProfileTop from '../ProfileTop/ProfileTop'
import ProfilePosts from '../profileComponents/ProfilePosts'
import './profile.css'
import React, { useEffect, useState } from 'react'

function Profile() {
  const { state } = useStateValue()
  const [posts, setPosts] = useState([])
  const [count,setCount] = useState({post:null,followers:null,following:null})

    useEffect(() => {
        async function getPosts() {
            try {
              const res = await axios.get('/user/get-post', { withCredentials: true })
                setPosts(res.data)
            } catch (error) {
                console.log(error.response.data);
            }
        }   
      getPosts()
      
    }, [])
  
  useEffect(() => {
      async function getPostCount() {
            try {
                const res = await axios.get('/user/user-count',{withCredentials:true})
             
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
  },[])
   
  return (
      <div className="profileContainer">
            <div className='profile'>
              <ProfileTop username={state.user.username} count={count} />
              <ProfilePosts posts={posts} user={state.user._id} />
            </div>
    </div>
  )
}

export default Profile