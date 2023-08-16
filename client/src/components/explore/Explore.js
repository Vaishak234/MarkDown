import ExploreImages from '../exploreComponents/ExploreImages'
import './explore.css'
import React, { useEffect } from 'react'

function Explore() {
  // useEffect(async() => {
  //   try {
  //     const randomPosts;
  //   } catch (error) {
      
  //   }
  // })
  return (
      <div className='exploreContainer'>
      <div className='explore'>
            <ExploreImages/>
      </div>
      </div>
  )
}

export default Explore