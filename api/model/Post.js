const mongoose = require('mongoose')

const LikesSchema = new mongoose.Schema({
    likedUser:mongoose.Schema.Types.ObjectId,
    likedAt: {
        type: String,
        default:Date.now()
    }
})

const CommentsSchema = new mongoose.Schema({
    commentUser: mongoose.Schema.Types.ObjectId,
    comment:String,
    commentAt: {
        type: String,
        default:Date.now()
    }
})

const postSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required:true
    },
    post: {
        type: String,
        reqired:true
    },
    dec: {
        type:String,
    },
    likes: {
        type:[LikesSchema]
    },
    comments: {
        type:[CommentsSchema]
    }
  
   
},{timestamps:true})
module.exports = mongoose.model('posts',postSchema)