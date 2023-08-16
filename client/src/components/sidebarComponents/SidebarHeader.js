import React, { useEffect, useState } from 'react'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import './sidebarHeader.css'
import SearchRecent from './SearchRecent';

function SidebarHeader() {

  const [isSearchMobile, setIsSearchMobile] = useState(false)
 
  const handleSearchBox = () => {
    setIsSearchMobile(!isSearchMobile)
  }

  useEffect(() => {
    
    function handleResize() {
      if (window.innerWidth > 900) {
       setIsSearchMobile(false)
      }
    }
    
    window.addEventListener("resize", handleResize);
    return () => {
       window.removeEventListener("resize", handleResize);
    }
  }, [])
  
    return (
      <>
            <div className="sidebar__header" >
              <h1 className='sidebar__header_icon' >MarkDown</h1>
              <div className="sidebar__header_right">
                 <input type="text" onClick={handleSearchBox} placeholder='search' />
                 <div role='button' >
                    <FavoriteBorderIcon  className='icon' />
                 </div>
          </div>
         
            </div>
            <div className="searchBox" style={{display:isSearchMobile?'block':'none'}}>
                <SearchRecent/>
                <SearchRecent/>
                <SearchRecent/>
        </div>
        
        </>
  )
}

export default SidebarHeader