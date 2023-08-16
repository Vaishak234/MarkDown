const express = require('express')
const Conversation = require('../model/Conversation')
const router = express.Router()


router.post('/',async (req, res) => {
    const conversation = await Conversation.findOne({
        members:{"$all":[req.body.senderId ,req.body.receiverId]}
    })
    if(conversation) return res.status(200).json('conversation already Exist')
    else {
          const newConversation = await Conversation.create({
           members:[req.body.senderId,req.body.receiverId]
          })
   
         if (!newConversation) return res.status(500).json('error in creating conversation')
         res.status(200).json('new conversation started')
    }
})

router.get('/all', async (req, res) => {
    
   
    const conversations = await Conversation.find({ members: { $in: [req.user._id.toString()] } })
    
    if (!conversations) return res.status(500).json('error get conversation')
    res.status(200).json(conversations)
})



module.exports = router