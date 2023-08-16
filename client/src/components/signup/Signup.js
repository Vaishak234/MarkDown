import React, { useState } from 'react'
import './signup.css'
import { Link, useNavigate } from 'react-router-dom'
import axios from '../../api/axios'

function Signup() {
const navigate = useNavigate()

   const [username, setUsername] = useState('')
   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')
   const [errMsg, setErrMsg] = useState(null)
  
  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const res = await axios.post('/auth/signup',{email,username,password})
      if (res.data) {
        navigate('/login')
      }
    } catch (error) {
      console.log(error.response.data);
      setErrMsg(error.response.data)
    }
  }
  
  return (
         <div className='login__Container'>
        <form onSubmit={handleSubmit} className='login'>
          <h1 className="login__title">MarkDown</h1>
          <input type="text" value={username} onChange={(e)=>setUsername(e.target.value)} placeholder='Enter your username' />
          <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='Enter your email address' />
          <input  type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='password' />
          <button className='login__button'>Signup</button>
            <p style={{textAlign:"center" ,paddingTop:"20px"}}>{errMsg}</p>
          </form>
          <div className="signup">
              <Link to={'/login'}><p style={{color:'black'}}>Already have an account ? login</p></Link>
          </div>
      </div>
  )
}

export default Signup