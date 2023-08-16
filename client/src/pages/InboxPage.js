import React, { createContext, useEffect, useRef, useState } from 'react'
import Sidebar from '../components/sidebar/Sidebar'
import './inboxPage.css'
import MessageBox from '../messageComponents/MessageBox'
import { useParams } from 'react-router-dom'
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import Messages from '../messages/Messages'
import { useStateValue } from '../StateProvider'
 

export const ConversationContext = createContext()

function InboxPage() {
  const {id} = useParams()
  const [conversationId, setConversationId] = useState(null)
  const { state } = useStateValue()
 
  
  return (
    <ConversationContext.Provider value={{conversationId,setConversationId}} >
      <div className='inboxPage'>
          <Sidebar isInbox={true} />
          <Messages /> 
        {
          id ? <MessageBox id={id} />
          : <div className="nomessage">
               <WhatsAppIcon className='icon' />
               <p className='title'>Your messages here</p>
             </div>
        }
      </div>
    </ConversationContext.Provider>
  )
}

export default InboxPage