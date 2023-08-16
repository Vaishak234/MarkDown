import { Link } from 'react-router-dom'
import axios from '../../api/axios'
import ProfilePostImage from './ProfilePostImage'
import './profilePosts.css'
import React, { useEffect, useState } from 'react'
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';

function ProfilePosts({posts ,user }) {
  
  return (
     <>
          <div className='profilePosts'>

          <div className="title">#Posts</div>
          <div className="profilePosts__posts">
              {
                  posts.length !== 0 ? posts.map((item,i) => {
                      return (
                          <ProfilePostImage user={user} item={item} key={i}/>
                      )
                  }) : <div className="noPostTag">
                              <InsertPhotoIcon className='icon'/>
                              <h1>No Posts Yet</h1>
                       </div>
              }
          </div>
          </div>
      </>
  )
}

export default ProfilePosts