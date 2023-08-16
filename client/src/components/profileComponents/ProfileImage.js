import React from 'react'
import './profileImage.css'
import { useStateValue } from '../../StateProvider'

function ProfileImage() {
    const {state} = useStateValue()

  return (
      <div className='profileImage'>
          <img src={"http://localhost:4000/profile-images/" + state.user.profileImg} alt="" />
       </div>
  )
}

export default ProfileImage 