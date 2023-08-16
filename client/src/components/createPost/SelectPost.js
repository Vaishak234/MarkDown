import React, { useContext, useState } from 'react'
import './selectPost.css'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { ImageContext } from '../sidebar/Sidebar';
import axios from '../../api/axios';
import { useNavigate } from 'react-router-dom';
import { useStateValue } from '../../StateProvider';
import ProfileImageAvatar from '../profileComponents/ProfileImageAvatar';

function SelectPost({file}) {
 
  const { image, setImage } = useContext(ImageContext)
  const {state}= useStateValue()
    const [dec, setDec] = useState('')
  const navigate = useNavigate()
  
  
    const handleSubmit = async (e) => {
      e.preventDefault()

      try {
          const formData = new FormData()
          formData.append('file',file)
          formData.append('dec',dec)
        const res = await axios.post('/user/new-post', formData, { headers: { "Content-Type": "multipart/form-data" }, withCredentials: true },
            
      )
       
        if (res.data) {
        
           window.location.replace('/')
        }

      } catch (error) {
        
         window.location.replace('/')
      }
     
  }
  return (
      <div className='selectPost'>
          <div className="selectPost__title">
              <div onClick={()=>setImage(null)}><ArrowBackIcon /></div>
              <h4>Create new Post</h4>
              <button onClick={handleSubmit}>share</button>
          </div>
          <div className="selectPost__content">
                <div className="selectPost__content_dec">
                  <div className="profile">
                      <ProfileImageAvatar width={'30px'} height={'30px'}/>
                      <p>{state.user.username}</p>
                  </div>
                  <textarea value={dec} onChange={e=>setDec(e.target.value)} placeholder='Write a caption'></textarea>
                </div>
          </div>
      </div>
  )
}

export default SelectPost