const mongoose = require('mongoose')

const conversationType = {
    SaltText : 1,
    Image : 2,
    Video : 3,
    Location: 4
}

const messageSchema = new mongoose.model(
    {
        sentTime: {
            type: Date,
            default: Date.now()
        },
        conversationId : {
            type: String,
            ref: 'users',
        },
        senderId : {
            type: String,
            ref: 'users',
        },
        messageType: {
            type: Number,
            enum: conversationType,
            default: conversationType.SaltText
        },

}
)