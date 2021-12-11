const mongoose = require('mongoose');

const counterSchema = mongoose.Schema({
    name: {
        type:String, 
        required:true
    },
    count: {
        type:Number, 
        default: 0
    }
});

// model & export
const Counter = mongoose.model('counter', counterSchema);
module.exports = { Counter }