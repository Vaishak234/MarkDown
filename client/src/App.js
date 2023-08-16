import './App.css';
import HomePage from './pages/HomePage';
import { Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import ExplorePage from './pages/ExplorePage';
import { FollowContext, useStateValue } from './StateProvider';
import ProtectRoute from './components/ProtectRoute';
import PostPage from './pages/PostPage';
import EditProfilePage from './pages/EditProfilePage';
import UserProfilePage from './pages/UserProfilePage';
import { createContext, useContext, useEffect, useState } from 'react';
import InboxPage from './pages/InboxPage';

export const FollowingState = createContext()


function App() { 

  const { state, dispatch } = useStateValue()
    const [followState,setFollowState] = useState(false)
  
 

  return (

    <div className="App">
        <FollowContext.Provider value={{followState,setFollowState}}>

        <Routes>
          
            <Route path='/signup' element={<LoginPage />} />
            <Route path='/login' element={ <LoginPage login={true} /> } /> 
            
       
          <Route element={<ProtectRoute />}>
            
            <Route exact path='/' element={<HomePage />} />
            <Route path='/profile' element={<ProfilePage />} />
            <Route path='/explore' element={<ExplorePage />} />
            <Route path='/profile-edit' element={<EditProfilePage/>} />
            <Route path='/post/:id/:user' element={<PostPage />} />

            <Route exact path='/:id' element={<UserProfilePage />} />
            
            <Route exact path='/inbox' element={<InboxPage/>} />
            <Route exact path='/inbox/:id' element={<InboxPage/>} />

          </Route>

        </Routes>

            </FollowContext.Provider>

    </div>
  );
}

export default App;
