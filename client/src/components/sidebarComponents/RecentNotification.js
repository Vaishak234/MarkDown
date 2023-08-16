import React from 'react'
import './recentNotification.css'
import ProfileImageforUsers from '../profileComponents/ProfileImageforUsers'
import {format} from 'timeago.js'
import { Link } from 'react-router-dom'


function RecentNotification({notification}) {
    
  return (
      <div className='recentNotification'>
          <div className="recentNotification__left">
              <ProfileImageforUsers width={'40px'} height={'40px'} profileImg={notification.profileImg} />
          <div className="content">
              {
                  notification.notifications.role === "comment"  &&  <p className='dec'> <Link className='username' to={'/'+notification.notifications.actionUser}>{notification.username}</Link> commented on your Post</p>
              }
              {
                  notification.notifications.role === "like"  &&  <p className='dec'> <Link className='username' to={'/'+notification.notifications.actionUser}>{notification.username}</Link> Liked your Post</p>
              }
              <p className="timeStamp">{format(notification.notifications.updatedAt)}</p>
          </div>
          </div>

          <img className='postImg' src={"http://localhost:4000/post-images/" + notification.post} alt="" />
      </div>
  )
}

export default RecentNotification