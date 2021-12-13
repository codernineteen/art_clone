const mongoose = require('mongoose');

const ArchiveSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'title needed'],
        maxlength: 20,
        minlength: 5 
    },
    subtitle : {
        type: String,
        required: [true, 'subtitle needed'],
        maxlength: 40,
        minlength: 5 
    },
    season : {
        type: String,
        enum: ["spring", "summer", "fall", "winter"],
        required: [true, 'season needed']
    },
    year : {
        type: String,
        required: true
    },
    images: {
        type: [String]
    }

}, {timestamps: true});



module.exports = mongoose.model('Archive', ArchiveSchema)