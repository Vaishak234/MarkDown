import React from 'react'
import './chatMessage.css'
import ProfileImageforUsers from '../components/profileComponents/ProfileImageforUsers'
import ProfileImageAvatar from '../components/profileComponents/ProfileImageAvatar'
import { format } from 'timeago.js'

function ChatMessage({message, own,profileImg }) {
   
  return (
      <>
         <div className={own?'chatMessage own' : 'chatMessage'}>
                                       <div className='chatMessageTop'>
              {
                  own ? <ProfileImageAvatar width={'32px'} height={'32px'} />
                      : <ProfileImageforUsers width={'32px'} height={'32px'} profileImg={profileImg} />
              }
              <p className="messageText">{message.text}</p>
                        </div>
                  <div className="messageTimeTag">{format(message.createdAt)}</div>
    
        </div>
      </>
  )
}

export default ChatMessage