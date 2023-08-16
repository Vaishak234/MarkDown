import React, { createContext, useContext, useState } from 'react'
import './newPost.css'
import { ImageContext } from '../sidebar/Sidebar';
import SelectPost from './SelectPost';
import axios from '../../api/axios';
import CloseIcon from '@mui/icons-material/Close';
function NewPost({createPost,setCreatePost}) {

  const { image, setImage } = useContext(ImageContext)
  const [file, setFile] = useState()
  
  
   
    
  return (
    <>
      
      {
        file ? (
          <SelectPost file={file} />
        ): (
            <div className='newPost'>
                  
              <div className="newPost__title">
                
                  <p>Create new Post</p>
                  <div onClick={()=>setCreatePost(!createPost)}>
                       <CloseIcon />
                   </div>
                     </div>
                     <div className="newPost__content">
                         <div className="newPost__input">
                           <p className='newPost__input_label'>Drag photos here</p>
                           <label htmlFor='newPostInp' className='newPost__input_button'>Select from device</label>
                           <input id='newPostInp' onChange={(e)=>setFile(e.target.files[0])} type="file" />
                         </div>
                     </div>
               </div>
        )
    }
   
    </>
  )
}

export default NewPost