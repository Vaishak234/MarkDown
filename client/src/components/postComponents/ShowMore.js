import React from 'react'
import './showMore.css'
import axios from '../../api/axios'
import { useNavigate } from 'react-router-dom'


function ShowMore({id}) {

    const navigate = useNavigate()
    const deletePost = async () => {
           try {
               const res = await axios.delete('/user/delete-post/'+id,{withCredentials:true})
               console.log(res.data)
               navigate('/profile',{replace:true})
            } catch (error) {
                console.log(error.response.data);
            }
    }

  return (
      <div className='showMore'>
          <p onClick={deletePost}>delete</p>
          <p>edit</p>
      </div>
  )
}

export default ShowMore