import React from 'react'
import './postPage.css'
import UserPost from '../components/userPost/UserPost'
import { useParams } from 'react-router-dom';

function PostPage() {
    let { id ,user } = useParams();
    
  return (
      <div className='postPage' >
          <UserPost id={id} user={user} />
      </div>
  )
}

export default PostPage