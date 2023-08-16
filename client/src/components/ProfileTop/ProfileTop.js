import ProfileImage from '../profileComponents/ProfileImage'
import './profileTop.css'
import React, { useEffect } from 'react'
import SettingsIcon from '@mui/icons-material/Settings';
import { Link } from 'react-router-dom';
import { useStateValue } from '../../StateProvider';
import ProfileImageAvatar from '../profileComponents/ProfileImageAvatar';


function ProfileTop({username ,count}) {
    const { state ,dispatch } = useStateValue()
    
    useEffect(() => {
       
         const user = localStorage.getItem("user")
         if (state.user !=={}) {
              dispatch({ type: 'SET_USER', user:JSON.parse(user) })
         }
    }, [])

  return (
      <div className='profileTop'>
          <div className='profileRight__container'>
                <ProfileImageAvatar width={'150px'} height={'150px'} />
          <div className="profileTop__right">
            
              <div className="profileTop__right_top" >
                      <h1 className='profileTop__username'>{username}</h1>
                    <Link  to={'/profile-edit'} className='editProfile__button'> <p>edit profile</p></Link>
                      <SettingsIcon className='icon' />
                      
             </div>
              <div className="profileTop__right_bottom">
                  <p>{count.posts? count.posts : 0} posts</p>
                  <p>{count.followers? count.followers : 0} followers</p>
                  <p>{count.following? count.following : 0} following</p>
                  </div>

          </div>
          
          </div>
          <div className="profileTop__name">
              <p>{state.user.name === 'null' || state.user.name === 'undefined' ? '' :state.user.name}</p>
          </div>
          <div className="profileTop__bio">
              <p>{state.user.bio === 'null' || state.user.bio === 'undefined' ? '': state.user.bio }</p>
          </div>

      </div>
  )
}

export default ProfileTop