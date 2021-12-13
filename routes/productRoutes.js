const express = require('express');
const router = express.Router();
const {authentication, authorizePermission} = require('../middleware/authenticate')
//multer - multiple file uploader
const upload = require('../middleware/multer');


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