const express = require('express');
const router = express.Router();
const {authentication, authorizePermission} = require('../middleware/authenticate')

const {
    getAdmin,
    updateAdmin
} = require('../controller/userController');

router.route('/:id')
    .get(authentication, authorizePermission('devADMIN'), getAdmin)
    .patch(authentication, authorizePermission('devADMIN'), updateAdmin);

module.exports = router;