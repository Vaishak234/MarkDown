import React from 'react'
import Login from '../components/login/Login'
import './authPage.css'
import Signup from '../components/signup/Signup'

function LoginPage({login}) {

  return (
      <div className='loginPage'>
          {
              login ? <Login /> : <Signup />
          }
      </div>
  )
}

export default LoginPage