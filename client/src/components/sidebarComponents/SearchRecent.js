import React, { useEffect, useState } from 'react'
import './searchRecent.css'
import CloseIcon from '@mui/icons-material/Close';
import ProfileImageforUsers from '../profileComponents/ProfileImageforUsers';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../../api/axios';


function SearchRecent({user,clearSearch,setClearSearch}) {
  
  const navigate = useNavigate()
 
  const navigateAction = async () => {
      
    try {
      const res = await axios.post('/user/save-search', { searchUser: user._id }, { withCredentials: true })
      const id = user.searchUsers ? user.searchUsers :user._id
      if (res.data) {
        navigate('/' + id, { replace:true })
      }
   } catch (error) {
    // console.log(error.response.data);
   }
  }

  const clearAction = async () => {
      
    try {
      const res = await  axios.get('/user/clear-recentusers/'+user.searchUsers , {withCredentials:true})
      console.log(res.data);
      setClearSearch(!clearSearch)
   } catch (error) {
     console.log(error.response.data);
   }
  }

  
    return (
   
      <div className='searchRecent' >
          <div className="searchRecent__left" onClick={navigateAction}>
              <ProfileImageforUsers width={'40px'} height={'40px'} profileImg={user?.profileImg}/>
              <p>{user?.username}</p>
          </div>
          <div className="searchRecent__right">
             
          {
            user?.searchUsers &&   <div onClick={clearAction} >
                                    <CloseIcon/>
                        </div>
          }
          </div>
            </div>
   
  )
}

export default SearchRecent