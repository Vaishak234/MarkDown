import React, { useEffect } from 'react'
import './profilePage.css'
import Sidebar from '../components/sidebar/Sidebar'
import { Link, useParams } from 'react-router-dom'
import UserProfile from '../components/otherUsers/UserProfile'

function UserProfilePage() {
  
    const { id } = useParams()
   
   
  return (
      <div className='profilePage'>
          <Sidebar />
          <UserProfile id={id} /> 
      </div>
  )
}

export default UserProfilePage