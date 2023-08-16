import React, { useContext, useEffect, useRef, useState } from 'react'
import './messageBox.css'
import ProfileImageforUsers from '../components/profileComponents/ProfileImageforUsers'
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import SendIcon from '@mui/icons-material/Send';
import EmojiPicker from 'emoji-picker-react';
import axios from '../api/axios';
import ChatSection from './ChatSection';
import { ConversationContext } from '../pages/InboxPage';
import { useStateValue } from '../StateProvider';

function MessageBox({ id }) {
    const [emojiBox, setEmojiBox] = useState(false)
    const [user, setUser] = useState(null)
    const [newMessage, setNewMessage] = useState(null)
    const [currentMessage, setCurrentMessage] = useState({})
    const { conversationId } = useContext(ConversationContext)
    const { state } = useStateValue()
   

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (newMessage === '' || newMessage === null) {

        } else {
            const messageObj = {
                sender: state.user._id,
                text: newMessage,
                conversationId,
            }
            setCurrentMessage(messageObj)
            try {
                const res = await axios.post('/messages/', messageObj, { withCredentials: true })
                console.log(res.data);
                setNewMessage('')
            } catch (error) {
                console.log(error.response.data);
            }
        }
    }
  
    useEffect(() => {
        
        async function getUsers() {
            try {
                const res = await axios.get('/user/get-user/' + id, { withCredentials: true })
                setUser(res.data)
            } catch (error) {
                console.log(error.response.data);
            }
        }
    
        getUsers()
         
    }, [id ,currentMessage])
    
    

  return (
      <div className='messageBox'>
          <div className="messageBox__profile">
              <ProfileImageforUsers  width={'50px'} height={'50px'} profileImg={user?.profileImg}/>
              <p className="username">{user?.username}</p>
          </div>
         
          
          <ChatSection user={user} currentMessage={currentMessage} />
          

          <form onSubmit={handleSubmit} className="messageBox__inputBox">
            
              <div role='button' onClick={()=>setEmojiBox(true)}><SentimentSatisfiedAltIcon className='emojiIcon' /></div>
              <input type="text" onChange={(e)=>setNewMessage(e.target.value)} value={newMessage} placeholder='Type message here' />
              <p role='button' className='sendButton'><SendIcon/></p>
          </form>
      </div>
  )  
}

export default MessageBox