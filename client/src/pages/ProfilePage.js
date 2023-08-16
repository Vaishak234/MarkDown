import React from 'react'
import './profilePage.css'
import Sidebar from '../components/sidebar/Sidebar'
import Profile from '../components/profile/Profile'
import { Link, useParams } from 'react-router-dom'
import UserProfile from '../components/otherUsers/UserProfile'

function ProfilePage({otherUser}) {
  
 
  return (
      <div className='profilePage'>
          <Sidebar />
          <Profile /> 
      </div>
  )
}

export default ProfilePage