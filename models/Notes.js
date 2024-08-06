const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    email:{
        required: true,
        type: String,   
    },
    group:{
        required: true,
        type: String,
        default: 'general',
    },
    color:{
        required: true,
        type: String,
        default: 'default',
    },
    title:{
        required: true,
        type: String,
    },
    content:{
        type: String,
    },
    positionX:{
        type: String,
        default: "0"
    },
    positionY:{
        type: String,
        default: "0"
    }
});

const Notes = mongoose.model('Notes', noteSchema);

module.exports = Notes;
