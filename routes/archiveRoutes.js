const express = require('express');
const router = express.Router();
const {authentication, authorizePermission} = require('../middleware/authenticate');

//multer
const path = require('path');
const multer = require('multer');
const uploadPath = path.join(__dirname, '../public/images/lookbookImage');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadPath)
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})
const upload = multer({
    storage: storage,
    onFileUploadStart: function (file) {
        console.log(file.originalname + ' is starting ...')
    }
})

const {
    createLookbook,
    getAllLookbooks,
    getSingleLookbook,
    updateLookbook,
    deleteLookbook,
    getSingleLookbookJson
} = require('../controller/archiveController');


router.route('/')
    .get(getAllLookbooks)

router.route('/create')
    .post(
        authentication, 
        authorizePermission('devADMIN'),
        upload.fields(
            [
                {'name': 'images'}
            ]
        ), 
        createLookbook)

router.route('/partialData').post(getSingleLookbookJson)

router.route('/:id')
    .get(getSingleLookbook)
    .patch(authentication, authorizePermission('devADMIN'), updateLookbook)
    .delete(authentication, authorizePermission('devADMIN'), deleteLookbook)

module.exports = router