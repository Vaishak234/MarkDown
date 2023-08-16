import React, { useEffect } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useStateValue } from '../StateProvider'



const ProtectRoute = () => {
   const {state,dispatch} = useStateValue()
    const location = useLocation()
      const user = localStorage.getItem("user")
      useEffect(() => {
            if (state.user !=={}) {
              dispatch({ type: 'SET_USER', user:JSON.parse(user) })
             }
     },[])
    return (
          
                state.user? <Outlet />
                : <Navigate to={'/login'} state={ {from:location}} replace />
     )    
}

export default ProtectRoute