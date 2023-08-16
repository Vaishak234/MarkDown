import React from 'react'
import './profileImageAvatar.css'
import { useStateValue } from '../../StateProvider'

function ProfileImageAvatar({width,height}) {
    const { state } = useStateValue()
    
    return (
      <div className='profileImageAvatar' style={{width:width,height:height}}  >
          {
              state?.user?.profileImg
                  ?<img src={"http://localhost:4000/profile-images/" + state.user.profileImg} alt="" />
                  : <img src="images/blankProfile.png" alt="" />
          }
      </div>
  )
}

export default ProfileImageAvatar