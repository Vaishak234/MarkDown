import React from 'react'
import './editProfilePage.css'
import Sidebar from '../components/sidebar/Sidebar'
import EditProfile from '../components/profileComponents/EditProfile'

function EditProfilePage() {

  return (
    <div className='editProfilePage__container'>
      <Sidebar />
      <div className='editProfilePage'>
          <EditProfile/>
      </div>

    </div>
  )
}

export default EditProfilePage