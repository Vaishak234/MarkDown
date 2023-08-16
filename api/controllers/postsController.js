const asyncHandler = require("express-async-handler");
const Post = require("../model/Post");
const User = require("../model/User")
const Notification = require("../model/Notification");
const { default: mongoose } = require("mongoose");
const { post } = require("../routes/postsRouter");


const likePost = asyncHandler(async (req, res) => {
     const user = req.user._id
    
    const isLiked = await Post.findOne({likes: {$elemMatch: {likedUser:new mongoose.Types.ObjectId(user)}}})
       
    if (isLiked) {
           return res.status(200).json('already liked')
    } else {
            
        const like = await Post.updateOne({ _id: req.params.id }, {
             $push: {likes: {likedUser: new mongoose.Types.ObjectId(user)}}
        })
       
         return res.status(200).json({liked:true})
    }

   
    
})

const likeAction = asyncHandler(async (req, res) => {
     const user = req.user._id

    const isLiked = await Post.findOne({_id:req.params.id,likes: {$elemMatch: {likedUser: new mongoose.Types.ObjectId(user)}}})
   
    if (isLiked) {
        const disLike = await Post.updateOne({ _id: req.params.id }, {
            $pull: {likes:  {likedUser: new mongoose.Types.ObjectId(user)}}
        })
         return res.status(200).json({liked:false})
    } else {
        
        const like = await Post.updateOne({ _id: req.params.id }, {
             $push: {likes: {likedUser: new mongoose.Types.ObjectId(user)}}
        })
       
         return res.status(200).json({liked:true})
    }

})

const isLiked = asyncHandler(async (req, res) => {
    const user = req.user._id
    const isLiked = await Post.findOne({ _id: req.params.id, likes: { $elemMatch: { likedUser: new mongoose.Types.ObjectId(user) } } })
    
    if (!isLiked) return res.status(200).json({ liked: false })
    res.status(200).json({liked:true})
})

const likesCount = asyncHandler(async (req, res) => {
    const user = req.user._id
    const post = await Post.findOne({ _id: req.params.id })
    const count = post.likes.length
   
    res.status(200).json(count)
})

const addLikesNotification = asyncHandler(async (req, res) => {

    const user = req.user._id
    const postsUser = req.body.postUser
    const postId = req.body.postId


    const userNotification = await Notification.findOne({ user:postsUser})
    if (!userNotification) {
        const addNotification = await Notification.create({
            user:postsUser,
            notifications:[{postId:new mongoose.Types.ObjectId(postId),actionUser:new mongoose.Types.ObjectId(user),role:"like",updatedAt: Date.now()}]
        })
        return res.status(200).json('added notification')
    } else {
        const addNotification = await Notification.updateOne({ user: postsUser },
           {
                $push: { notifications: {postId:new mongoose.Types.ObjectId(postId),actionUser:new mongoose.Types.ObjectId(user),role:"like",updatedAt:Date.now()} }
            }
        )
          return res.status(200).json('updated notification')
    }
   
})

const removeLikesotification = asyncHandler(async (req, res) => {
    
    
    const user = req.user._id
    const postsUser = req.body.postUser
    const postId = req.body.postId

      const userNotification = await Notification.findOne({ user:postsUser})
    if (!userNotification) {
        return res.status(200).json('no notification')
    } else {
        const removeNotification = await Notification.updateOne({ user: postsUser },
           {
                $pull: { notifications: {postId:new mongoose.Types.ObjectId(postId),actionUser:new mongoose.Types.ObjectId(user),role:'like'} }
            }
        )
        if(removeNotification) return res.status(200).json('removed notification')
    }
})



const commentAction = asyncHandler(async (req, res) => {
    const user = req.user._id
    const comment = req.body.comment
    const postId = req.body.postId

     const addComment = await Post.updateOne({ _id: postId }, {
             $push: {comments: {commentUser: new mongoose.Types.ObjectId(user),comment}}
        })
       
    if (!addComment) return res.status(500).json('error in adding comment')
    res.status(200).json('comment added')
})

const getComments = asyncHandler(async (req, res) => {
    
    const postId = new mongoose.Types.ObjectId(req.params.id)
   
    const comments = await Post.aggregate([
        {
            $match: {
               _id:postId
           }
        },
        {
            $unwind:"$comments"
        },
        {
            $project: {
                _id: 1,
                comment: "$comments.comment",
                commentUser:"$comments.commentUser",
                commentId:"$comments._id",
            }
        },
         {
            $lookup: {
                  from: "users",
                  localField: "commentUser",
                  foreignField: "_id",
                  as: "result"
               }
        },
        {
             $unwind:"$result"
        },
        {
            $project: {
                _id: 1,
                comment: 1,
                commentUser: 1,
                commentId: 1,
                username: "$result.username",
                profileImg:"$result.profileImg",
           } 
        }


    ])
    
        
    if(!comments) return res.status(500).json('error in fetching comment')
    res.status(200).json(comments)
})

const deleteComment = asyncHandler(async (req, res) => {
    const postId = req.body.postId
    const commentId = req.body.commentId
    const userId = req.user._id

    const deletedComment = await Post.updateOne({ _id: postId }, {
       $pull:{comments:{commentUser:new mongoose.Types.ObjectId(userId),_id:commentId}}
    })
    
    if(!deletedComment) return res.status(500).json('error in fetching comment')
    res.status(200).json('deleted comment')
})
 
const addCommentsNotification = asyncHandler(async (req, res) => {

    const user = req.user._id
    const postsUser = req.body.postUser
    const postId = req.body.postId
    const comment = req.body.comment

    const userNotification = await Notification.findOne({ user:postsUser})
    if (!userNotification) {
        const addNotification = await Notification.create({
            user:postsUser,
            notifications:[{postId:new mongoose.Types.ObjectId(postId),actionUser:new mongoose.Types.ObjectId(user),comment,role:'comment',updatedAt: Date.now()}]
        })
        return res.status(200).json('added notification')
    } else {
        const addNotification = await Notification.updateOne({ user: postsUser },
           {
                $push: { notifications: {postId:new mongoose.Types.ObjectId(postId),actionUser:new mongoose.Types.ObjectId(user),comment,role:'comment',updatedAt:Date.now()} }
           }
        )
          return res.status(200).json('updated notification')
    }
   
})

const removeCommentsNotification = asyncHandler(async (req, res) => {
    
    
    const user = req.user._id
    const postsUser = req.body.postUser
    const postId = req.body.postId
    const comment = req.body.comment

      const userNotification = await Notification.findOne({ user:postsUser})
    if (!userNotification) {
        return res.status(200).json('no notification')
    } else {
        const removeNotification = await Notification.updateOne({ user: postsUser },
           {
                $pull: { commentsNotification: {postId:new mongoose.Types.ObjectId(postId),commentUser:new mongoose.Types.ObjectId(user),comment} }
            }
        )
        if(removeNotification) return res.status(200).json('removed notification')
    }
})


const getNotification = asyncHandler(async (req, res) => {

     const user = req.user._id

     const userNotification = await Notification.aggregate([
        {
          $match : {user}
         },
         {
            $unwind:"$notifications"
         },
         {
            $lookup: {
                  from: "users",
                  localField: "user",
                  foreignField: "_id",
                  as: "result"
               }
         },
         {
            $unwind:"$result"
         }, 
        
         {
            $project: {
                user: 1,
                postId:"$notifications.postId",
                notifications: 1,
                username:"$result.username",
                profileImg: "$result.profileImg",
            }
         }, 
         {
            $lookup: {
                  from: "posts",
                  localField: "postId",
                  foreignField: "_id",
                  as: "result"
               }
         },
         {
            $unwind:"$result"
         }, 
          {
              $project: {
                _id:0,
                notifications:1,
                  username: 1,
                  profileImg: 1,
                  post: "$result.post",
                  dec: "$result.dec",
                  
            }
         }, 
         
     ])
    console.log(userNotification);
    if(userNotification)return res.status(200).json(userNotification)
    
})

module.exports = {
    likeAction,
    isLiked,
    likesCount,
    likePost,
    addLikesNotification,
    removeLikesotification,
    commentAction,
    getComments,
    deleteComment,
    addCommentsNotification,
    getNotification,
    removeCommentsNotification
}