const mongoose = require('mongoose')



const searchSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required:true
    },
    searchUsers: {
        type: Array,
        default:[],
    },
   
},{timestamps:true})
module.exports = mongoose.model('recent-search',searchSchema)