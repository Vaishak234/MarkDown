import React, { useContext, useEffect, useRef, useState } from 'react'
import './chatSection.css'
import ChatProfile from './ChatProfile'
import ChatMessage from './ChatMessage'
import axios from '../api/axios'
import { useStateValue } from '../StateProvider'
import { ConversationContext } from '../pages/InboxPage'

function ChatSection({ user ,currentMessage}) {
    const [messages, setmessages] = useState([])
    const { state } = useStateValue()
    const {conversationId } = useContext(ConversationContext)
    const scrollRef = useRef()

    useEffect(() => {
        
         async function getmessages() {
            try {
                    const res = await axios.get('/messages/'+conversationId,{withCredentials:true})
               
                    setmessages([ ...res.data  ])
                
            } catch (error) {
               console.log(error.response.data);
            }
        }
        getmessages()
    }, [conversationId,currentMessage]) 
    
    useEffect(() => {
        scrollRef?.current?.scrollIntoView({ behaviour: "smooth" });
        
    },[messages])
   
  return (
      <div className='chatSection'>
          <ChatProfile profileImg={user?.profileImg} id={user?._id} username={user?.username} />
          
          {
              messages && messages.map((message, i) => {
                  return (
                 
                      <>
            
                             <div ref={scrollRef}>
                                <ChatMessage message={message} own={message?.sender === state.user._id} />
                              </div>
                      </>
                  )
              })
          }
          
        
         

      </div>
  )
}

export default ChatSection