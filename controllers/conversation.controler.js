const asyncHandler = require('express-async-handler')
const {Conversation, conversationType} = require("../model/Conversation");
const {User} = require("../model/User");
const {ObjectId} = require('mongodb')

const getUsersConversations = asyncHandler ( async (req, res) => {
    const creater = req.user

    const conversations = await Conversation.find({ membersId: creater.sub }).select('_id membersId');

    return res.status(400).json(conversations).end()
})

const createConversation = asyncHandler (async (req,res) => {
    const {members, conversationStyle } = req.body
    const creater = req.user

    for(var i = 0; i < members.length; ++i)
    {
        var isExist = await User.exists({_id : new ObjectId(members[i])}).exec()

        if(!isExist){
            throw new Error("This User is not exist")
        }
    }

    if(members.length < 1){
        throw new Error("members cant be empty")
    }

    if(conversationType[conversationStyle] === conversationType.Private || conversationType[conversationStyle] === conversationType.Meeting)
    {
        if(members.length > 1){
            throw new Error("This is false")
        }
    }

    await Conversation.create({
        membersId: [...members, creater.sub],
        conversationType : conversationType[conversationStyle],
        craeterUserId : creater.sub
    })

    return res.status(400).json("Conversation Created").end()
})

const addUserConversation = asyncHandler( async (req, res) => {
    const {members, conversationId } = req.body

    var conversation = await Conversation.findOne({ _id: conversationId }).exec();



    if (!conversation) {
        throw new Error("Conversation not found");
    }

    for(var i = 0; i < members.length; ++i)
    {
        var isExist = await User.exists({_id : new ObjectId(members[i])}).exec()

        if(!isExist){
            throw new Error("This User is not exist")
        }
    }

    var isMemberExist = conversation.membersId.some(memberId => members.includes(memberId));

    if (isMemberExist) {
        throw new Error("This User already member of the Conversation");
    }

    conversation.membersId.push(...members);

    await conversation.save();

    return res.status(400).json("User added to Conversation").end()
})

const removeUserConversation = asyncHandler (async  (req, res) => {

    const {members, conversationId } = req.body

    var conversation = await Conversation.findOne({ _id: conversationId }).exec();

    if (!conversation) {
        throw new Error("Conversation not found");
    }

    for(var i = 0; i < members.length; ++i)
    {
        var isExist = await User.exists({_id : new ObjectId(members[i])}).exec()

        if(!isExist){
            throw new Error("This User is not exist")
        }
    }

    var isMemberExist = conversation.membersId.some(memberId => members.includes(memberId));

    if (!isMemberExist) {
        throw new Error("This User is not a member of the Conversation");
    }

    conversation.membersId.push(...members);

    await conversation.save();

    return res.status(400).json("User added to Conversation").end()
})

const deleteConversations = asyncHandler ( async (req, res) => {
    const creater = req.user
    const { conversationId } = req.query

    const conversations = await Conversation.findOneAndDelete({ _id: conversationId });

    return res.status(400).json(conversations).end()
})

module.exports = {
    getUsersConversations,
    addUserConversation,
    createConversation,
    removeUserConversation,
    deleteConversations
}