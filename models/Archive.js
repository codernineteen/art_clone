const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({
    name: {type: [String], required: true},
    path: {type: [String], required: true}
})

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
        required: [true, 'season needed']
    },
    year : {
        type: String,
        required: true
    },
    images: {
        type: [ImageSchema]
    }

}, {timestamps: true});



module.exports = mongoose.model('Archive', ArchiveSchema)