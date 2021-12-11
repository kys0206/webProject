const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const courseSchema = mongoose.Schema({
    writer: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    title: {
        type: String,
        maxlength: 70
    },
    description: {
        type: String,
    },
    address: {
        type: String,
        maxlength: 50
    },
    friend: {
        type: String,
        maxlength: 50
    },
    images: {
        type: Array,
        default: []
    },

    continents: {
        type: Number,
        default: 1
    },
    places: {
        type: Number,
        default: 1
    },

    views: {
        type: Number,
        default: 0
    }
    
}, { timestamps: true })

courseSchema.index({
    title: 'text',
    description: 'text'
}, {
    weights: {
        title: 5, // title를 5배 더 중요시 해서 검색한다
        description: 1 // description을 1배 더 중요시 해서 검색한다.
    }
})


const Course = mongoose.model('Course', courseSchema);

module.exports = { Course }