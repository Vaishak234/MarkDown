import React, { useEffect, useState } from 'react'
import { useStateValue } from '../StateProvider'

function useLoginSuccess() {
   const [data,setData] = useState()
   const {state,dispatch} = useStateValue()

     const refresh = () => {
       const user = window.localStorage.getItem('user') 
       console.log(user);
       if (state.user === {}) (
          console.log(state)
          //dispatch({ type: 'SET_USER', user:user })
       )
     }


  return refresh
}

export default useLoginSuccess