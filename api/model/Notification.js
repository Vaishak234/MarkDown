const mongoose = require('mongoose')

const notificationSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required:true
    },
    notifications: {
        type:Array
    }
  
   
},{timestamps:true})
module.exports = mongoose.model('notification',notificationSchema)