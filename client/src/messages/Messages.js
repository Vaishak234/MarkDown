import { useStateValue } from '../StateProvider'
import RecentMessage from '../messageComponents/RecentMessage'
import axios from '../api/axios'
import { ConversationContext } from '../pages/InboxPage'
import './messages.css'
import React, { useContext, useEffect, useState } from 'react'

function Messages() {
  //const [users,setUsers] = useState([])

  // useEffect(() => {
  //    async function getUsers() {
  //           try {
  //             const res = await axios.get('/user/all-users', { withCredentials: true })
  //               setUsers(res.data) 
  //           } catch (error) {
  //               console.log(error.response.data);
  //           }
  //   } 
    
  //   getUsers() 
    
  // },[])
  
  const [conversation, setConversation] = useState([])
  const { state } = useStateValue()
  const {conversationId} = useContext(ConversationContext)
    
    useEffect(()=> {
         async function getConversation() {
            try {

                const res = await axios.get('/conversation/all',{withCredentials:true})
               
                setConversation(res.data)
            } catch (error) {
               console.log(error.response.data);
            }
      }
      getConversation()

    }, [conversationId])
   
  return (
      <div className='messages'>
          <div className="messages__title">
             <h1> Messages </h1>
          </div>
      {
        conversation.map((c,i) => {
          return (
            <RecentMessage conversation={c} key={i} />
          )
        })
      }
      
      </div>
  )
}

export default Messages