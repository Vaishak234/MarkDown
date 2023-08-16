import React, { useEffect, useState } from 'react'
import './homePage.css'
import Sidebar from '../components/sidebar/Sidebar'
import Posts from '../components/posts/Posts'
import axios from '../api/axios'
import EditProfile from '../components/profileComponents/EditProfile'

function Home() {

  
  return (
      <div className="home">
          
          <Sidebar /> 
          <Posts /> 
       
    </div>
  )
}

export default Home