const express = require('express')
const Conversation = require('../model/Conversation')
const Message = require('../model/Message')
const router = express.Router()

router.post('/', async(req, res) => {
    const newMessage = await Message.create(req.body)
    if (!newMessage) return res.status(500).json('error in creating message')
    res.status(200).json('message sended')
})

router.get('/:conversationId',async (req, res) => {
    const messages =await Message.find({
        conversationId:req.params.conversationId
    })
  
    if (!messages) return res.status(500).json('error in creating conversation')
    res.status(200).json(messages)
})


module.exports = router