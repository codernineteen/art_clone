const Archive = require('../models/Archive');
const {StatusCodes} = require('http-status-codes');
const CustomError = require('../errors');

const createLookbook = async (req, res) => {
    const thisYear = new Date().getFullYear()
    req.body.year = thisYear
    const lookbook = await Archive.create(req.body)
    res.status(StatusCodes.CREATED).json({lookbook})
}

const getAllLookbooks = async (req, res) => {
    const lookbooks = await Archive.find({});
    res.status(StatusCodes.OK).json({lookbooks})
}

const getSingleLookbook = async (req, res) => {
    const lookbook = await Archive.findOne({_id: req.params.id});
    if(!lookbook) {
        throw new CustomError.NotFound('No lookbook with that id')
    }
    res.status(StatusCodes.OK).json({lookbook})
}

const updateLookbook = async (req, res) => {
    const lookbook = await Archive.findOneAndUpdate({_id: req.params.id}, req.body, {new: true, runValidators: true});
    if(!lookbook) {
        throw new CustomError.NotFound('No notice with that id')
    }
    res.status(StatusCodes.OK).json({msg: "수정 되었습니다."})
}

const deleteLookbook = async (req, res) => {
    const lookbook = await Archive.findOneAndDelete({_id: req.params.id});
    if(!lookbook) {
        throw new CustomError.NotFound('No notice with that id')
    }
    res.status(StatusCodes.OK).json({msg: "삭제 되었습니다."})
}

module.exports = {
    createLookbook,
    getAllLookbooks,
    getSingleLookbook,
    updateLookbook,
    deleteLookbook
}