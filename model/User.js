const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            trim: true
        },
        firstName: {
            type: String,
            trim: true
        },
        lastName: {
            type: String,
            trim: true
        },
        passwordHash: {
            type: String
        },
        passwordSalt: {
            type: String
        },
        timeZone: {
            type: Number
        },
        createdAt: {
            type: Date,
            default: Date.now()
        },
        photoId: {
            type: Number,
            default: 0
        },
        slug: String
    }
)

const User = mongoose.model('users', userSchema)

module.exports = {User }