import { Link } from 'react-router-dom'
import './profilePostImage.css'
import React from 'react'

function ProfilePostImage({ item ,user}) {

  return (
    <Link to={'/post/'+item._id+'/'+user}>
        <div className='profilePostImage' >
           <img src={"http://localhost:4000/post-images/" + item.post} alt="" />
        </div>
    </Link>
    
  )
}

export default ProfilePostImage