import React, { createContext, useEffect, useState } from 'react'
import './sidebar.css'
import SidebarLink from '../sidebarLink/SidebarLink'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AddIcon from '@mui/icons-material/Add';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import TelegramIcon from '@mui/icons-material/Telegram';
import ExploreIcon from '@mui/icons-material/Explore';
import SearchIcon from '@mui/icons-material/Search';
import HomeIcon from '@mui/icons-material/Home';
import SlideshowIcon from '@mui/icons-material/Slideshow';
import MenuIcon from '@mui/icons-material/Menu';
import Search from '../sidebarComponents/Search';
import SidebarHeader from '../sidebarComponents/SidebarHeader';
import {Link} from 'react-router-dom'
import MoreModal from '../sidebarComponents/MoreModal';
import NewPost from '../createPost/NewPost'
import SelectPost from '../createPost/SelectPost';
import Notification from '../sidebarComponents/Notification';
import ProfileImageAvatar from '../profileComponents/ProfileImageAvatar';


    export const ImageContext = createContext()


function Sidebar({isInbox}) {
    const [isSearch,setIsSearch] = useState(false)
    const [isNotify,setIsNotify] = useState(false)
    const [isMore,setIsMore] = useState(false)
    const [createPost,setCreatePost] = useState(false)
    const [image, setImage] = useState(null)
    
    createPost? (document.body.style.overflow = 'hidden'):(document.body.style.overflow = 'auto')

    useEffect(() => {
  
    function handleResize() {
      if (window.innerWidth <= 900) {
          setIsSearch(false)
          setIsNotify(false)
      }
    }
    
    window.addEventListener("resize", handleResize);
    return () => {
       window.removeEventListener("resize", handleResize);
    }
  }, [])
  

    const handleSearch = () => {
        setIsSearch(!isSearch)
        setIsMore(false)
        setIsNotify(false)
    }

    const handleNotify = () => {
        setIsNotify(!isNotify)
        setIsSearch(false)
    }
    const handleCreatePost = () => {
        setCreatePost(!createPost)
        setIsNotify(false)
        setIsSearch(false)
        setIsMore(false)
    }

    const handleMore = () => {
        setIsMore(!isMore)
        setIsNotify(false)
        setIsSearch(false)
    }
    
  

    return (
        <ImageContext.Provider value={{image,setImage}}>
        <div style={{position:'relative'}}> 
            <SidebarHeader />
         
      <div className='sidebar' style={{width:isSearch || isInbox ?'80px': isNotify? '80px' : ''}} >

                <h1 className='sidebar__title' style={{display:isSearch  || isInbox?'none': isNotify? 'none' : ''}}>MarkDown</h1>
                <h1 className='sidebar__title_icon' style={{display:isSearch || isInbox?'block': isNotify? 'block' : ''}} >M</h1>

          <div className="sidebar__nav " >
                        <Link to={'/'}><SidebarLink isInbox={isInbox} icon={<HomeIcon />} title={'Home'} /> </Link>
                         <div className="sidear__notify" role='button' onClick={handleSearch}>
                             <SidebarLink  isInbox={isInbox} icon={<SearchIcon  />}  title={"Search"}  hidden={true}/>
                        </div>
             {/* <SidebarLink isInbox={isInbox} icon={<SlideshowIcon />} title={'Reels'}/>
                        <Link to={'/explore'}><SidebarLink isInbox={isInbox} icon={<ExploreIcon />} title={'Explore'} /></Link> */}

                        <div className="sidear__notify" role='button' onClick={handleNotify}>
                            <SidebarLink isInbox={isInbox} icon={isNotify?<FavoriteIcon/>:<FavoriteBorderIcon/>} title={'Notification'}  hidden={true}/>
                        </div>

                        <Link to={'/inbox'}><SidebarLink isInbox={isInbox} icon={<TelegramIcon />} title={'Share'} /></Link>
                        
                    <div className='sidebar__addPostt' role='button' onClick={handleCreatePost}>
                        <SidebarLink isInbox={isInbox} icon={<AddIcon />} title={'Create'} />
                      </div>
                        <Link to={'/profile'}> <SidebarLink isInbox={isInbox} icon={<ProfileImageAvatar height={'25px' } width={'25px'} />} title={'Profile'} /> </Link>
          </div>
          <div onClick={handleMore} role='button' className="sidebar__more">
                    <SidebarLink  isInbox={isInbox} icon={<MenuIcon />} title={'More'} />
                    {
                        isMore && <MoreModal/>
                    }
          </div>
                    </div>
                 
           <div className="sidebar__notify" style={{left: isNotify? '78px' : '-360px'}} >
                 <Notification/>
                </div>
                
            <div className="sidebar__search" style={{left: isSearch? '78px' : '-360px'}} >
                  <Search />
                </div>
                
            

        </div>
        
        {
                 createPost && <div className="sidebar__newPost">
                      <NewPost createPost={createPost} setCreatePost={setCreatePost}/>
                 </div>
         }
    
    </ImageContext.Provider>
  )
}

export default Sidebar