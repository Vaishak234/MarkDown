import './userPost.css'
import React, { useEffect, useState } from 'react'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import axios from '../../api/axios';
import ShowMore from '../postComponents/ShowMore';
import { useStateValue } from '../../StateProvider';

function UserPost({ id  ,user}) {
    
    const [post, setPost] = useState('')
    const [showMore, setShowMore] = useState(false)
    const {state} = useStateValue()
    const [myProfile, setMyProfile] = useState(false)
    

    useEffect(() => {
       
        if (user === state.user._id) {
            setMyProfile(true)
         }
    }, [state.user])
    
   

    useEffect(() => {
         async function getPosts() {
            try {
                const res = await axios.get('/user/get-post/' + id, { withCredentials: true })
                setPost(res.data)
            } catch (error) {
                console.log(error.response.data);
            }
        }   
        getPosts()
    },[])

  return (
      <div className='UserPost' style={{backgroundBlendMode:showMore? 'rgba(0, 0, 0, 0.319)' : 'initial'}}>
          {
              myProfile && <div onClick={() => setShowMore(!showMore)}><MoreHorizIcon className='moreIcon' /></div>
          }
          <img src={"http://localhost:4000/post-images/" + post.post} alt="" />
          {
              showMore && <ShowMore id={id} />
          }
      </div>
  )
}

export default UserPost