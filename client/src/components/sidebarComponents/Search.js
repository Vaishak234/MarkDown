import React, { useEffect, useRef, useState } from 'react'
import './search.css'
import SearchRecent from './SearchRecent'
import axios from '../../api/axios'

function Search() {
  const [result, setResult] = useState([])
  const [clearSearch,setClearSearch] = useState(false)
  const resultInp = useRef()

  const [recentSearch, setRecentSearch] = useState([])
  
  useEffect(() => {
     const getSavedSearch = async() => {
     try {
      const res = await  axios.get('/user/search-recentusers',{withCredentials:true})
  
       setResult(res.data)
      } catch (error) {
        console.log(error.response.data);
      }
    }
    getSavedSearch()
  },[clearSearch])


  const handleSubmit = async (e) => {
    
   const search = resultInp.current.value

    try {
      const res = await axios.get('/user/search/' + search, { withCredentials: true })
      setResult(res.data)
    } catch (error) {
      // console.log(error.response.data);
    }
  }

  return (
      <div className='searchContainer'>
        <div className='search'>
        <h1 className="search__title">Search</h1>
      
            <input type="text" className="search__input" ref={resultInp}  onChange={handleSubmit} placeholder='Search' />
       
      </div>
      
      <div className="searchRecentContainer">
       
            {
           result.length === 0 ? <h2>No user found</h2> :
              (  result.map((user,i) => {
                         return (
                           <SearchRecent user={user} key={i} clearSearch={clearSearch} setClearSearch={setClearSearch} />
                           
                          )
              }))
            
          } 
        </div>
      </div>
  )
}

export default Search