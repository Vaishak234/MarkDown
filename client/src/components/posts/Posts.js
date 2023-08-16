import React, { createContext, useContext, useEffect, useState } from 'react'
import Post from '../post/Post'
import './posts.css'
import axios from '../../api/axios'
import { FollowContext } from '../../StateProvider'




function Posts() {
  const [posts, setPosts] = useState([])

   useEffect(() => {
        async function getPosts() {
            try {
                const res = await axios.get('/user/all-post',{withCredentials:true})
                setPosts(res.data) 
            } catch (error) {
                console.log(error.response.data);
            }
     }   
   
     getPosts()
     
    },[])
  return (



          <div className='posts'> 
      {
        posts.length !== 0 ? posts.map((item, i) => {
          return (
            <Post key={i} item={ item}  />
          )
        }) : <h2 style={{textAlign:"center"}}>No Posts</h2>
      }
      </div>

  )
}

export default Posts