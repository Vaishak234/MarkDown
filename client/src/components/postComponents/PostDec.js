import React from 'react'
import './postDec.css'
import { useStateValue } from '../../StateProvider'
import { Link } from 'react-router-dom'

function PostDec({username , dec}) {
  const { state } = useStateValue()
  
  return (
      <div className='postDec'>
      <Link to={'/'+state.user._id} className='postDec__username'>{username}</Link>
      <p className='postDec__dec'>{dec}</p>
      </div>
  )
}

export default PostDec