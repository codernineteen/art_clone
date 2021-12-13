const User = require('../models/User');
const {StatusCodes} = require('http-status-codes');
const CustomError = require('../errors');
const {
    createToken,
    verifyToken,
    attachCookiesToResponse
} = require('../utils/jwt');



const registerAdmin = async(req, res) => {
    const {name, email, password} = req.body;
    const emailAlreadyExists = await User.findOne({email})
    if (emailAlreadyExists) {
        throw new CustomError.BadRequest("Email is already existed")
    }
    const user = await User.create({name, email, password});
    const tokenPayload = {userId: user._id, name: user.name, role: user.role};
    attachCookiesToResponse({res, eachPayload: tokenPayload});
    res.status(StatusCodes.CREATED).json({user: {tokenPayload}});
}

const login = async (req, res, next) => {
    const {email, password} = req.body;
    if(!email || !password){
        throw new CustomError.BadRequest('Please provide both email and password')
    }

    const user = await User.findOne({email});
    if(!user) {
        throw new CustomError.Unauthorized(`No user with that email : ${email}`)
    }
    const isPasswordMatch = await user.comparePassword(password);
    
    if(!isPasswordMatch) {
        throw new CustomError.Unauthorized('Either Password or Email is incorrect')
    }

    const tokenPayload = {userId: user._id, name: user.name, role: user.role};
    attachCookiesToResponse({res, eachPayload: tokenPayload});
    res.status(StatusCodes.ACCEPTED).json({user})
}

const logout = async (req, res) => {
    res.cookie(
        'token',
        'logout',
        {
            httpOnly: true,
            expires: new Date(Date.now())
        }
    )
    res.status(StatusCodes.OK).json({msg : "you logged out"})
}


module.exports = {
    registerAdmin,
    login,
    logout
}