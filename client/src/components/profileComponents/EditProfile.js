import React, { useEffect, useState } from 'react'
import './editProfile.css'
import axios from '../../api/axios'
import { useStateValue } from '../../StateProvider'
import ProfileImageAvatar from './ProfileImageAvatar'
import { useNavigate } from 'react-router-dom'
import ProfileImageforUsers from './ProfileImageforUsers'

function EditProfile() {

    const {state} = useStateValue()
   
    const [bio,setBio] = useState()
    const [file, setFile] = useState()
    const [name, setName] = useState()
    const navigate = useNavigate()
    const [image, setImage] = useState(null)

  const onImageChange = (e) => {
      setFile(e.target.files[0])
    if (e.target.files && e.target.files[0]) {
        setImage(URL.createObjectURL(e.target.files[0]));
      }
  }
  
  useEffect(() => {
    setName(state.user.name)
    setBio(state.user.bio)
  }, [state.user])
  
  const handleSubmit = async (e) => {
      e.preventDefault()

      try {
          const formData = new FormData()
          formData.append('file',file)
          formData.append('bio',bio)
          formData.append('name',name)
          const res = await axios.post('/user/edit-profile', formData,{headers: { "Content-Type": "multipart/form-data" },withCredentials:true},
 )
          console.log(res.data.status);
          localStorage.setItem("user",JSON.stringify(res.data.user));
          navigate('/profile',{replace:true})

      } catch (error) {
        console.log(error.response.data);
      }
     
    }
  console.log('user : ', state.user);
  console.log(image);
    
  return (
      <form onSubmit={handleSubmit} className='editProfile'>
          <h1>Edit profile</h1>
          <div className="editProfile__profileImg">
         
        {
          image ? <img src={image} alt="" /> : <ProfileImageAvatar width={'50px'} height={'50px'} />
        }
          
       
              <div className="profileImg__inp">
                  <p>Vashak</p>
                  <label htmlFor="ImgInp" >change profile image</label>
                  <input id='ImgInp' onChange={(e)=>onImageChange(e)} type="file" hidden  />
              </div>
          </div>
            <div className="editProfile__bio">
              <h2>Name</h2>
              <input type="text" value={name} onChange={(e)=>setName(e.target.value)}  className="bioInp" />
          </div>
          <div className="editProfile__bio">
              <h2>Bio</h2>
              <input type="text" value={bio} onChange={(e)=>setBio(e.target.value)}  className="bioInp" />
          </div>
        
          <button type='submit'>Submit</button>
      </form>
  )
}

export default EditProfile