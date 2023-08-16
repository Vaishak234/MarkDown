import React from 'react'
import './chatProfile.css'
import ProfileImageforUsers from '../components/profileComponents/ProfileImageforUsers'
import { Link } from 'react-router-dom'

function ChatProfile({profileImg,id,username}) {
  return (
      <div className='chatProfile'>
          <ProfileImageforUsers width={'100px'} height={'100px'} profileImg={profileImg} />
          <h2 className="username">{username}</h2>
          <Link to={'/'+id} className='chatProfile__btn'>view profile</Link>
      </div>
  )
}

export default ChatProfile