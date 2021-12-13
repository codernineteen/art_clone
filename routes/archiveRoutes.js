const express = require('express');
const router = express.Router();
const {authentication, authorizePermission} = require('../middleware/authenticate')

const {
    createLookbook,
    getAllLookbooks,
    getSingleLookbook,
    updateLookbook,
    deleteLookbook
} = require('../controller/archiveController');


router.route('/')
    .get(getAllLookbooks)
    .post(authentication, authorizePermission('devADMIN'), createLookbook)

router.route('/:id')
    .get(getSingleLookbook)
    .patch(authentication, authorizePermission('devADMIN'), updateLookbook)
    .delete(authentication, authorizePermission('devADMIN'), deleteLookbook)

module.exports = router