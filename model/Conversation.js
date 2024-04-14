const mongoose = require('mongoose')

const conversationType = {
    Private : 1,
    Group : 2,
    Meeting : 3
}

const conversationSchema = new mongoose.Schema(
    {
        membersId:[
            {
            type: String,
            ref: 'users',
        }
        ],
        conversationType: {
            type: Number,
            enum: conversationType,
            default: conversationType.Private
        },
        craeterUserId:  {
            type: String,
            ref: 'users',
        },
        createdAt: {
            type: Date,
            default: Date.now()
        }
    }
)

const Conversation = mongoose.model("conversations", conversationSchema)

module.exports = {Conversation, conversationType }