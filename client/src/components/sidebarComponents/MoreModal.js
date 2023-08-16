import React from 'react'
import './moreModal.css'
import { useNavigate } from 'react-router-dom'
import axios from '../../api/axios'
import { useStateValue } from '../../StateProvider'

function MoreModal() {
  const navigate = useNavigate()
  const {dispatch} = useStateValue()
  const handleLogout =  async () => {
    try {
      const res = await axios.post('/auth/logout')
      console.log(res);
      if (res.data) {
        dispatch({ type: 'LOGOUT_USER', user: {} })
        window.localStorage.clear()
        navigate('/login', { replace: true})
      }
    } catch (error) {
       console.log(error.response.status);
    }
  }

  return (
      <div className='moreModal' role='button' onClick={handleLogout}>
          Logout
      </div>
  )
}

export default MoreModal