const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = mongoose.Schema({

    writer: {
        type: Schema.Types.ObjectId, 
        ref: 'User'
    },
    title: {
        type:String,
        maxlength: 50
    },
    description: {
        type: String
    },
    privacy: {
        type: Number
    },
    filePath: {
        type: String
    },
    category: {
        type: String
    },
    views: {
        type: Number,
        default: 0
    },
    thumbnail: {
        type: String
    }

}, { timestamps: true})

const Post = mongoose.model('Post', postSchema);

module.exports = { Post }