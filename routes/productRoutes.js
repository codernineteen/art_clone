const express = require('express');
const router = express.Router();
const {authentication, authorizePermission} = require('../middleware/authenticate')
//multer - multiple file uploader
const path = require('path')
const multer = require('multer')
const uploadPath = path.join(__dirname, '../public/images/productImage')

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
    getAllProduct,
    getSingleProduct,
    createProduct,
    updateProduct,
    deleteProduct
} = require('../controller/productController');


router.route('/')
    .get(getAllProduct)

router.route('/create')
    .post(
        authentication, 
        authorizePermission('devADMIN'), 
        upload.fields(
            [
                {'name': 'partImages'},
                {'name': 'totalImages'}
            ]
        ), 
        createProduct
    )

router.route('/:id')
    .get(getSingleProduct)
    .patch(authentication, authorizePermission('devADMIN'), updateProduct)
    .delete(authentication, authorizePermission('devADMIN'), deleteProduct)

module.exports = router