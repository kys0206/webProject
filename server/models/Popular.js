const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const popularSchema = mongoose.Schema({
    writer: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    title: {
        type: String,
        maxlength: 50
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

popularSchema.index({
    title: 'text',
    description: 'text'
}, {
    weights: {
        title: 5, // title를 5배 더 중요시 해서 검색한다
        description: 1 // description을 1배 더 중요시 해서 검색한다.
    }
})


const Popular = mongoose.model('Popular', popularSchema);

module.exports = { Popular }