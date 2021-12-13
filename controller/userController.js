const User = require('../models/User');
const {StatusCodes} = require('http-status-codes');
const CustomError = require('../errors');

const getAdmin = async(req, res) => {
    const {userId} = req.user
    const admin = await User.findOne({_id:userId})

    res.status(StatusCodes.OK).json({admin})
}

const updateAdmin = async(req, res) => {
    const {userId} = req.user
    const {oldPassword, newPassword} = req.body
    if(!oldPassword || !newPassword) {
        throw new CustomError.BadRequest('Both password needed')
    }

    const admin = await User.findOne({_id:userId});
    const isMatch = await admin.comparePassword(oldPassword);
    if(!isMatch) {
        throw new CustomError.Unauthorized('Password incorrect')
    }
    admin.password = newPassword;
    await admin.save();
    
    res.status(StatusCodes.OK).json({msg: 'password changed'})
}

module.exports = {
    getAdmin,
    updateAdmin
}