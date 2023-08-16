import React from 'react'
import Explore from '../components/explore/Explore'
import './explorePage.css'
import Sidebar from '../components/sidebar/Sidebar'

function ExplorePage() {
  return (
      <div className='explorePage'>
          <Sidebar/>
          <Explore/>
      </div>
  )
}

export default ExplorePage