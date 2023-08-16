import React, { useEffect, useState } from 'react'
import './notification.css'
import SearchRecent from './SearchRecent'
import axios from '../../api/axios'
import RecentNotification from './RecentNotification'

function Notification() {

   const [notification, setNotification] = useState([])

   useEffect(() => {
    async function getNotification() {
            try {
              const res = await axios.get('/posts/notifications/get', { withCredentials: true })
              setNotification(res.data)
            } catch (error) {
                console.log(error.response.data);
            }
     }   
   
     getNotification()
     
    },[])


  return (
    
      <div className='notificationContainer'>
        <div className='notification'>
            <h1 className="notification__title">Notification</h1>
      </div>
      
      <div className="searchRecentContainer">

        {
          notification.map((notification, i) => {
            return (
               <RecentNotification notification={notification} key={i}/>
            )
          })
        }
        
        
      </div>
      </div>

  )
}

export default Notification