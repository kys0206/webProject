const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const comment2Schema = mongoose.Schema({
    writer: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }, 
    postId: {
        type: Schema.Types.ObjectId,
        ref: 'Popular'
    },
    responseTo: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    content: {
        type: String
    }

}, { timestamps: true })


const Comment2 = mongoose.model('Comment2', comment2Schema);

module.exports = { Comment2 }
