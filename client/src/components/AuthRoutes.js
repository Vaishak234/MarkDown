import React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useStateValue } from '../StateProvider'

const AuthRoutes = () => {

    const {state} = useStateValue()
    const location = useLocation()
   
    return (
          state?.user?.email
                ? <Navigate to={'/login'}  />
                : <Navigate to={'/login'}  />
     )    
}

export default AuthRoutes