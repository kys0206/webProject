const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const boardSchema = mongoose.Schema({
    boardId: {
        type: Number, 
		unique: true
    },
    
    userId: {
        type: String
    },

    writer: {
        type: Schema.Types.ObjectId, 
        ref: 'User'
    },

    title: {
        type: String,
        maxlength: 50
    },

    text: {
        type: String,
    },

    viewCounts: {
        type: Number,
        default: 0
    },

    commentIndex: {
        type: Number,
        default: 0
    },
    
    upVote: {
        type: Number,
        default: 0
    },
    
    downVote: {
        type: Number,
        default: 0
    }
    
}, { timestamps: true })

boardSchema.index({
    title: 'text',
    description: 'text'
}, {
    weights: {
        title: 5, // title를 5배 더 중요시 해서 검색한다
        description: 1 // description을 1배 더 중요시 해서 검색한다.
    }
})


const Board = mongoose.model('Board', boardSchema);

module.exports = { Board }