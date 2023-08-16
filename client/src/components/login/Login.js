import React, { useEffect, useState } from 'react'
import './login.css'
import { Link, useNavigate } from 'react-router-dom'
import axios from '../../api/axios'
import { useStateValue } from '../../StateProvider'


function Login() {
  const navigate = useNavigate()

  const [email, setEmail] = useState('vaishakh@gmail.com')
  const [password,setPassword] = useState('123')
  const [errMsg, setErrMsg] = useState(null)

  const{dispatch} =  useStateValue()
  
  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      const res = await axios.post('/auth/login',{email,password},{withCredentials:true})
      if (res.data) {
        
        dispatch({ type: 'SET_USER', user: res.data })
        localStorage.setItem("user",JSON.stringify(res.data));
        navigate('/',{replace:true})
      }
    } catch (error) {
      console.log(error.response.data);
      setErrMsg(error.response.data)
    }
  }

  const handleGoogleLogin = async () => {
    const newWindow = window.open("http://localhost:4000/api/auth/google", "_self")
  }

  return (
      <div className='login__Container'>
        <form onSubmit={handleLogin} className='login'>
          <h1 className="login__title">MarkDown</h1>
          <input value={email} onChange={(e)=>setEmail(e.target.value)} type="email" placeholder='Enter your email address' />
          <input value={password} onChange={(e)=>setPassword(e.target.value)}  type="password" placeholder='password' />
        <button className='login__button'>Login</button>
        <p style={{textAlign:"center" ,paddingTop:"20px"}}>{errMsg}</p>
          {/* <p className='login__or'>or</p> */}
          {/* <div className='login__googleLogin' role='button' onClick={handleGoogleLogin}>
              <img src="/images/google.png" alt="" />
              login with Google
          </div>
          <p className='login__forgot'>forgot password?</p> */}
          </form>
          <div className="signup">
             <Link to='/signup'> <p style={{color:'black'}}>Don't have an account ? signup</p></Link>
          </div>
      </div>
  )
}

export default Login