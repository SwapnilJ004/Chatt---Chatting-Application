import Conversation from "../models/conversation.model.js"
import Message from "../models/message.model.js"

export const sendMessage = async(req, res, next) => {
    try{
        const { message } = req.body
        const { id: receiverId } = req.params
        const senderId = req.user.id

        let conversation = await Conversation.findOne({
            participants: {$all: [senderId, receiverId]}
        })

        if(!conversation){
            conversation = await Conversation.create({
                participants: [senderId, receiverId]
            })
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            message
        })

        if(newMessage){
            conversation.messages.push(newMessage._id)
        }

        //Save conversation and messages:
        await Promise.all([conversation.save(), newMessage.save()])

        //Socket IO functionality


        res.status(201).json(newMessage)
    }
    catch(error){
        next(error)
    }
}

export const receiveMessage = async(req, res, next) => {
    try{
        const {id: userToMessage} = req.params
        const senderId = req.user.id

        const conversation = await Conversation.findOne({
            participants: {$all: [senderId, userToMessage]}
        }).populate("messages")
        
        if(!conversation){
            return res.status(200).json([])
        }

        const messages = conversation.messages

        res.status(200).json(messages)
    }
    catch(error){
        next(error)
    }
}