const mongoose = require('mongoose');

const NoticeSchema = new mongoose.Schema({
    index : {
        type: Number,
        required: [true, 'index needed']
    },
    name: {
        type: String,
        required: [true, 'name needed'],
    },
    subject : {
        type: String,
        required: [true, 'subject needed'],
        maxlength: 50,
        minlength: 5 
    },
    writerId : {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'writer needed'],
    },
    numOfView : {
        type: Number,
        default: 0
    },
    content: {
        type: String,
        required: true
    }

}, {timestamps: true});



module.exports = mongoose.model('Notice', NoticeSchema)