import React from 'react'
import './sidebarLink.css'

function SidebarLink({icon,title,hidden,isInbox}) {
  return (
      <div className={hidden?'sidebarLink hiddenOnMobile' : 'sidebarLink'}   >
      <div className="icons" >{icon}</div>
      <p className='sidebarLink__title' style={{display: isInbox? 'none':''}} >{title }</p>
      </div>
  )
}

export default SidebarLink