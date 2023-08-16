import React from 'react'
import './profileImageAvatar.css'
import { useStateValue } from '../../StateProvider'

function ProfileImageforUsers({width,height ,profileImg}) {

    return (
      <div className='profileImageAvatar' style={{width:width,height:height}}  >
          {
             profileImg 
                  ?<img src={"http://localhost:4000/profile-images/" + profileImg} alt="" />
                    : <img src="/images/blankProfile.png" alt="" />
                
                
          }
      </div>
  )
}

export default ProfileImageforUsers