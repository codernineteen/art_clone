const Notice = require('../models/Notice');
const {StatusCodes} = require('http-status-codes');
const CustomError = require('../errors');

const createNotice = async (req, res) => {
    req.body.writerId = req.user.userId;
    req.body.name = req.user.name;

    const notices = await Notice.find({});
    const index = notices.length + 1;
    req.body.index = index
    console.log(req.body)
    const notice = await Notice.create(req.body)
    res.status(StatusCodes.CREATED).json({notice})
}

const getAllNotices = async (req, res) => {
    let result = Notice.find({});
    const page = Number(req.query.page) || 1
    const limit = 14;
    const skip = (page - 1) * limit;
    result = result.skip(skip).limit(limit)
    const notices = await result
    res.status(StatusCodes.OK).render('notice' , {notices})
}

const getSingleNoticeData = async (req, res) => {
    const notice = await Notice.findOne({_id: req.params.id});
    if(!notice) {
        throw new CustomError.NotFound('No notice with that id')
    }
    res.status(StatusCodes.OK).json({notice});
}

const getSingleNotice = async (req, res) => {
    const notice = await Notice.findOne({_id: req.params.id});
    if(!notice) {
        throw new CustomError.NotFound('No notice with that id')
    }
    res.status(StatusCodes.OK).render('noticeSingle' , {notice})
}

const updateNotice = async (req, res) => {
    const notice = await Notice.findOneAndUpdate({_id: req.params.id}, req.body, {new: true, runValidators: true});
    if(!notice) {
        throw new CustomError.NotFound('No notice with that id')
    }
    res.status(StatusCodes.OK).json({msg: "수정 되었습니다."})
}

const deleteNotice = async (req, res) => {
    const notice = await Notice.findOneAndDelete({_id: req.params.id});
    if(!notice) {
        throw new CustomError.NotFound('No notice with that id')
    }
    res.status(StatusCodes.OK).json({msg: "삭제 되었습니다."})
}

module.exports = {
    createNotice,
    getAllNotices,
    getSingleNotice,
    updateNotice,
    deleteNotice,
    getSingleNoticeData
}