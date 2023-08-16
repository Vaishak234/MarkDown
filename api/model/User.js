const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        reqired:true
    },
    email: {
        type: String,
        reqired:true
    },
    password: {
        type: String,
        reqired:true
    },
    bio: {
        type: String,
        default:null
    },
    name: {
        type: String,
        default:null
    },
    profileImg: {
        type: String,
        default:null
    },
    followers: {
        type: Array,
        default:[]
    },
    following: {
        type: Array,
        default:[]
    }
   
})
module.exports = mongoose.model('users',userSchema)