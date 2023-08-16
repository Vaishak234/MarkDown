import { Link } from 'react-router-dom'
import { useStateValue } from '../StateProvider'
import ProfileImageforUsers from '../components/profileComponents/ProfileImageforUsers'
import './recentMessage.css'
import React, { useContext, useEffect, useState } from 'react'
import axios from '../api/axios'
import { ConversationContext } from '../pages/InboxPage'

function RecentMessage({ conversation  }) {
   const [user,setUser] = useState(null)
   const { state } = useStateValue()
   const {conversationId,setConversationId } = useContext(ConversationContext)
  
  useEffect(() => {
    setConversationId(localStorage.getItem('conId'))
    const friendId = conversation.members.find(m => m !== state.user._id)
    async function getUser() {
            try {
              const res = await axios.get('/user/get-user/' + friendId, { withCredentials: true })
            
                setUser(res.data) 
            } catch (error) {
                console.log(error.response.data);
            }
    } 
    
    getUser() 
     
  }, [conversationId])
  
  const conversationIdHandler = () => {
    setConversationId(conversation._id)
    localStorage.setItem('conId',conversation._id)
  }
  


   
  return (
      <Link to={'/inbox/'+user?._id}>
        <div className='recentMessage' onClick={conversationIdHandler}>
          <ProfileImageforUsers width={'50px'} height={'50px'} profileImg={user?.profileImg} />
          <div className="recentMessage__items">
              <p className="username">{user?.username}</p>
          <p className='active__status'> Active now</p>
      
          </div>
       </div>
      </Link>
  )
}

export default RecentMessage