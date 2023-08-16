const asyncHandler = require("express-async-handler");
const User = require("../model/User");
const Post = require("../model/Post");
const fs = require('fs');
const RecentSearch = require("../model/RecentSearch");
const { default: mongoose } = require("mongoose");

const editProfile = asyncHandler(async (req, res) => {
  
    const user = req.user
    const saveUser = await User.updateOne({ email: user.email }, {
        bio: req.body?.bio,
        name: req.body?.name,
        profileImg: req?.file?.filename
    })
    const updatedUser = await User.findOne({ email: user.email })
    res.status(200).json({status:'profile updated',user:updatedUser})
})

const createPost = asyncHandler(async (req, res) => {
    
    const user = req.user
     const savePost = await Post.create( {
         user: user._id,
         post: req.file.filename,
         dec:req.body.dec
     })
    if(!savePost) return res.status(500).json('error in creating post')
    res.status(200).json('post created')
})

const getUserPost = asyncHandler(async (req, res) => {
    const user = req.user
    const userPost = await Post.find({user:user._id})
    if(!userPost) return res.status(500).json('couldnt get posts')
    res.status(200).json(userPost)
})
const getOtherUserPost = asyncHandler(async (req, res) => {
    const userId = req.params.id
  
    const userPost = await Post.find({user:userId})
    if(!userPost) return res.status(500).json('couldnt get posts')
    res.status(200).json(userPost)
})

const userExist = asyncHandler(async (req, res) => {
    const id = req.params.id 
    const userExist = await User.findOne({ _id: id })
    if (!userExist) return res.status(404).json('no user found')
    res.status(200).json('user found')
})

const getAllPost = asyncHandler(async (req, res) => {
    const user = req.user
    const posts = await Post.aggregate([ 
        {
               $lookup: {
                  from: "users",
                  localField: "user",
                  foreignField: "_id",
                  as: "allPosts"
               }
        },
        {
            $unwind: '$allPosts'
        },
            {
                $project: {
                    user: 1,
                    post: 1,
                    dec: 1,
                    createdAt: 1,
                    updatedAt:1,
                    username: "$allPosts.username",
                    profileImg: "$allPosts.profileImg",
               }
        },
        {
            $sort:{createdAt:-1}
        }
    ])
   
    if(!posts) return res.status(500).json('couldnt get posts')
    res.status(200).json(posts)
})

const getUserPostwithId = asyncHandler(async (req, res) => {
    const id = req.params.id
    
    const userPost = await Post.findOne({_id: id })
   
    if(!userPost) return res.status(500).json('couldnt get post')
    res.status(200).json(userPost) 
})

const getOtherUserPostwithId = asyncHandler(async (req, res) => {
    const user = req.user
    const id = req.params.id
    
    const userPost = await Post.findOne({ user: user._id, _id: id })
   
    if(!userPost) return res.status(500).json('couldnt get post')
    res.status(200).json(userPost) 
})

const deleteUserPost = asyncHandler(async (req, res) => {
    const user = req.user
    const id = req.params.id

    const post = await Post.findById(id)
    const deletePost = await Post.deleteOne({ user: user._id, _id: id })
    const deletePostImage = fs.unlinkSync('public/post-images/'+post.post)
    if (!deletePost) return res.status(500).json('error in deleting post')
    res.status(200).json('post deleted')
})

const editUserPost = asyncHandler(async (req, res) => {
    const user = req.user
    const id = req.params.id
    const editPost = await Post.updateOne({ user: user._id, _id: id }, {
        dec: req.body.dec,    
    })
    if (!editPost) return res.status(500).json('error in updating post')
    res.status(200).json('post updated')
})

const followUser = asyncHandler(async (req, res) => {
    const userId = req.user._id
    const id = req.params.id

    const isFollowing = await User.findOne({
        _id: userId,
        following: { $in: [id] },
    })
  
    if (!isFollowing) {
        const userPost = await User.updateOne({ _id: userId },
           { $push: { following:id } }
        )

        const otherUserPost = await User.updateOne({ _id: id },
           { $push: { followers:userId } }
        )
        
        return res.status(200).json('started following')

    }

    res.status(200).json('already following')
})
const unfollowUser = asyncHandler(async (req, res) => {
    const userId = req.user._id
    const id = req.params.id

    const isFollowing = await User.findOne({
        _id: userId,
        following: { $in: [id] },
    })
  
    if (isFollowing) {
        const userPost = await User.updateOne({ _id: userId },
           { $pull: { following:id } }
        )

        const otherUserPost = await User.updateOne({ _id: id },
           { $pull: { followers:userId } }
        )
        
        return res.status(200).json('unfollowed')

    }

    res.status(200).json('not following')
})

const isFollowing = asyncHandler( async (req,res) => {
    const userId = req.user._id
    const id = req.params.id
    let status;
    const isFollow = await User.findOne({
        _id: userId,
        following: { $in: [id] },
    })
    if (isFollow) {
        status = true
    } else {
        status = false
    }
    return res.status(200).json({status})
})
const getOtherUser = asyncHandler( async (req,res) => {
    const id = req.params.id
    const otherUser = await User.findOne({ _id: id })
   
    if(!otherUser) return res.status(404).json('user not found')
     res.status(200).json(otherUser)
})
const getUserCount  = asyncHandler( async (req,res) => {
    const user = req.user._id
    
    const postCount = await Post.find({ user }).count()
    const followersCount = await User.aggregate([
        {
        $match : {_id:user}
        },
        {
            '$addFields': {
                'size': {
                    '$size': '$followers'
                }
            }
        },
        {
            $project: {
                "size": 1,
                '_id':0
            }
        }
       
    ])
    const followingCount = await User.aggregate([
        {
        $match : {_id:user}
        },
        {
            '$addFields': {
                'size': {
                    '$size': '$following'
                }
            }
        },
        {
            $project: {
                "size": 1,
                '_id':0
            }
        }
       
    ])

    let followers= followersCount[0].size ? followersCount[0].size : 0
    let following= followingCount[0].size ? followingCount[0].size :0

    res.status(200).json({postCount,followers,following})
})

const getOtherUserCount  = asyncHandler( async (req,res) => {
    const user = req.params.id
    
    const postCount = await Post.find({ user }).count()
    const userData = await User.findOne({ _id: user })
   
    let followers= userData.followers.length
    let following= userData.following.length

    res.status(200).json({postCount,followers,following})
})

const searchUser  = asyncHandler( async (req,res) => {
 
    const search = req.params.user
   
    const user =  await User.find({ username: new RegExp(search, 'i') })
    user.password = null
    if (!user) {
        return res.status(400).json({error: 'no user found'})
    }
    res.status(200).json(user)
    
})

 
const getAllUsers  = asyncHandler( async (req,res) => {
 
    const userId = req.user._id
    
    const users = await User.find({ _id: { $nin: [userId] } },)
    if (!users) return res.status(500).json('not found')
    
    res.status(200).json(users)
})

const getUserWithId  = asyncHandler( async (req,res) => {
 
    const userId = req.params.id
    
    const user = await User.findOne({ _id:userId },)
    if (!user) return res.status(500).json('not found')
    
    res.status(200).json(user)
})

const saveSearchUser = asyncHandler(async (req, res) => {
   
    const userId = req.user._id
    const userExist = await RecentSearch.findOne({ user: userId })
   
    if (!userExist) {
        const user = await RecentSearch.create({ user: userId }, {
            searchUsers:[ new mongoose.Types.ObjectId(req.body.searchUser)]
        })
        return res.status(200).json('created search for user')
    } else {
      
        const saveUser = await RecentSearch.updateOne({ user: userId },
            {
                $push: { searchUsers: new mongoose.Types.ObjectId(req.body.searchUser) }
            }
        )
        if (!saveUser) return res.status(500).json('not found')
     
        res.status(200).json('saved search')
    }
})

const clearSearchUser = asyncHandler(async (req, res) => {
   
    const userId = req.user._id
    const userExist = await RecentSearch.findOne({ user: userId })
   
    if (!userExist) {
        
        return res.status(200).json('no search history')
    } else {
      
        const clearUser = await RecentSearch.updateOne({ user: userId },
            {
                $pull: { searchUsers: new mongoose.Types.ObjectId(req.params.id) }
            }
        )
        if (!clearUser) return res.status(500).json('not found')
        console.log(clearUser);
        res.status(200).json('clear search')
    }
})

const searchSavedUser = asyncHandler(async (req, res) => {

    const searchUsers = await RecentSearch.aggregate([
        {
          $match : {user:req.user._id}
        },
        {
            $unwind:"$searchUsers"
        },
        {
            $project: {
                "searchUsers": 1
            }
        },
         {
            $lookup: {
                  from: "users",
                  localField: "searchUsers",
                  foreignField: "_id",
                  as: "result"
               }
        },
        {
            $unwind:"$result"
        },
        {
            $project: {
                searchUsers: 1,
                profileImg: "$result.profileImg",
                username:"$result.username"
            }
        }
    ])
    
    
   
    if (!searchUsers) return res.status(500).json('not found')
    res.status(200).json(searchUsers)

})

 
module.exports = {
    editProfile,
    createPost,
    getUserPost,
    getOtherUser,
    getOtherUserPost,
    deleteUserPost,
    editUserPost, 
    getUserPostwithId,
    getAllPost,
    followUser,
    isFollowing,
    unfollowUser,
    getOtherUserPostwithId,
    getUserCount,
    getOtherUserCount,
    searchUser,
    getAllUsers,
    getUserWithId,
    userExist,
    saveSearchUser,
    searchSavedUser,
    clearSearchUser
}  