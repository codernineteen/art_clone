const express = require('express');
const router = express.Router();
const {authentication, authorizePermission} = require('../middleware/authenticate')

const {
    createNotice,
    getAllNotices,
    getSingleNotice,
    updateNotice,
    deleteNotice
} = require('../controller/noticeController');


router.route('/')
    .get(getAllNotices)
    .post(authentication, authorizePermission('devADMIN'), createNotice)

router.route('/:id')
    .get(getSingleNotice)
    .patch(authentication, authorizePermission('devADMIN'), updateNotice)
    .delete(authentication, authorizePermission('devADMIN'), deleteNotice)

module.exports = router