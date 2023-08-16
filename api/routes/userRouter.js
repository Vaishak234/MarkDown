const express = require('express')
const router = express.Router()
const {postUpload,upload}= require('../middlewares/multer')
const { editProfile,createPost,getUserPost,deleteUserPost,getUserPostwithId, editUserPost ,getAllPost,followUser,unfollowUser,isFollowing, getOtherUserPost, getOtherUser ,getUserCount, getOtherUserCount, searchUser, getAllUsers, getUserWithId, userExist, saveSearchUser,searchSavedUser, clearSearchUser} = require('../controllers/userController')
const verifyAuth = require("../middlewares/verifyAuth");

router.use(verifyAuth)

router.post('/edit-profile',upload.single('file'),editProfile)
router.post('/new-post',postUpload.single('file'),createPost)
router.get('/get-post', getUserPost)
router.get('/all-post', getAllPost)

router.get('/get-post/:id',getUserPostwithId)
router.delete('/delete-post/:id',deleteUserPost)
router.put('/edit-post/:id',editUserPost)

router.get('/follow-user/:id',followUser)
router.get('/unfollow-user/:id',unfollowUser)
router.get('/isfollowing/:id', isFollowing)

router.get('/get-otherUser/:id', getOtherUser)
router.get('/otherUser-post/:id', getOtherUserPost)

router.get('/user-count',getUserCount)
router.get('/user-count/:id',getOtherUserCount)
router.get('/search/:user', searchUser)

router.get('/all-users',getAllUsers)
router.get('/get-user/:id',getUserWithId)


router.get('/userExist/:id',userExist)
router.post('/save-search',saveSearchUser)
router.get('/search-recentusers',searchSavedUser)
router.get('/clear-recentusers/:id',clearSearchUser)

module.exports = router