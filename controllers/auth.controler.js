const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose')
const {User,} = require('../model/User')
const slugGenerator = require('../utils/slugGenerator')
const saltValue = process.env.SALT

const genereteToken = (userId, userEmail, tokenType, secret = process.env.JWT_KEY) => {
    const payload = {
        email: userEmail,
        sub: userId,
        type: tokenType
    }

    return jwt.sign(payload, secret,
        {
            expiresIn: process.env.JWT_EXPIRES_TIME
        })
}

const register = asyncHandler( async (req,res) => {
    const { email, firstName, lastName, password, timeZone } = req.body

    const isEmail = await User.exists({email : email}).exec()

    if(isEmail){
        throw new Error("This Email is already using")
    }

    const salt = await bcrypt.genSaltSync(Number(saltValue))
    const hashedPassword = await bcrypt.hashSync(password, salt)

    let slug = slugGenerator(firstName + ' ' + lastName)
    let counter = 1

    while (await User.exists({ slug }).exec()) {
        slug = slugGenerator(firstName + ' ' + lastName + ' ' + counter)
        counter++
    }

    await User.create({
        email,
        firstName,
        lastName,
        passwordHash: hashedPassword,
        passwordSalt: salt,
        timeZone,
        slug
    }).catch(e => res.status(400).json({ message: e.message }))

    res.status(201).json({ message: 'User registered successfully' });

})

const login = asyncHandler ( async  (req, res) => {
    const {email, password} = req.body

    const UserDetails = await User.findOne({email: email}).exec()

    if (UserDetails == null) {
        throw new Error("This Email is not valid")
    }

    var isPasswordValid = bcrypt.compare(password, UserDetails.passwordHash)

    if (!isPasswordValid) {
        throw new Error("Password Wrong")
    }

    var token = genereteToken(UserDetails._id,UserDetails.email)

    return res.status(200).json({ token }).end()
})


module.exports = {register, login}